import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import * as path from "path";
import * as fs from "fs";
import mongoose, { PipelineStage } from "mongoose";
import { genFileNameWithDate } from "../helpers/filesystem";
// import { Awss3Service } from "../awss3/awss3.service";
import { PublishStateEnum } from "../enums/publishState.enum";
import { v4 as uuid4 } from "uuid";

type SortType = {
    createdAt?: number;
    name?: number;
    updatedAt?: number;
    _id?: number;
};

@Injectable()
export abstract class BaseService {
    // @Inject(Awss3Service)
    // private awsS3Service: Awss3Service;
    protected relations: any = {};

    constructor(public mongoModel: any) {}

    model() {
        return this.mongoModel;
    }

    count(query = {}) {
        return this.mongoModel.where(query).countDocuments();
    }

    create(data: any) {
        Object.assign(data, { uuid: uuid4() });
        return this.mongoModel.create(data);
    }

    findOneAndUpdate(filter: any, data: any) {
        return this.mongoModel.findOneAndUpdate(filter, data, { returnOriginal: false });
    }

    find(query: object, options = {}) {
        return this.mongoModel.find(query, options);
    }

    findExceptId(query: object, _id: any, options = {}): any {
        Object.assign(query, { _id: { $ne: _id } });
        return this.mongoModel.find(query, options);
    }

    findOne(query: object, options = {}): any {
        return this.mongoModel.findOne(query, options);
    }

    aggregate(stages: PipelineStage[]) {
        return this.mongoModel.aggregate(stages).allowDiskUse(true);
    }

    aggregatePipes(options: any = {}) {
        const withRelations = options.hasOwnProperty("withRelations") ? options.withRelations : [];
        let relations: any = [];

        withRelations.map((r: any) => {
            if (this.relations.hasOwnProperty(r)) {
                relations = [...relations, ...this.relations[r]];
            }
        });

        return relations;
        // return [];
    }

    aggregateStages(match: any, sort: SortType = { createdAt: -1 }, options: any = {}) {
        match = this.makeSearchObjectFromQueryParam(match || {});
        const aggPipes = this.aggregatePipes(options);
        let pipes = [...[{ $sort: sort }], ...aggPipes, ...[{ $match: match }]];

        if (match.$text) {
            pipes = [
                ...[{ $match: { $text: match.$text } }],
                ...[{ $sort: sort }],
                ...aggPipes,
                ...[{ $match: match }],
            ];
            delete match.$text;
        }

        return pipes;
    }

    async withRelations(match: any, sort: SortType = { createdAt: -1 }, options: any = {}) {
        return this.aggregate(this.aggregateStages(match, sort, options)).allowDiskUse(true);
    }

    async withAllRelations(query: any, sort: SortType = { createdAt: -1 }, options: any = {}) {
        Object.assign(options, { withRelations: Object.keys(this.relations) });
        return this.aggregate(this.aggregateStages(query, sort, options)).allowDiskUse(true);
    }

    makeSearchObjectFromQueryParam(query: any) {
        const ids: any = [];
        Object.entries(query)
            .filter((o) => o[0] === "_id")
            // .map((r) => new mongoose.Types.ObjectId(r[1].toString()));
            .map((r: any) => {
                if (typeof r[1] == "string") {
                    // return new mongoose.Types.ObjectId(`${r[1].toString()}`);
                    ids.push(new mongoose.Types.ObjectId(`${r[1].toString()}`));
                }
                if (typeof r[1] == "object") {
                    Object.keys(r[1]).forEach(function (key, index) {
                        // r[1][key] =  new mongoose.Types.ObjectId(`${r[1][key]}`);
                        // ids.push(new mongoose.Types.ObjectId(`${r[1][key]}`));
                        ids.push(r[1]);
                    });
                }
            });

        if (ids.length > 0) {
            query = { ...query, ...{ _id: { $in: ids } } };
        }

        Object.entries(query).map((q, i) => {
            if (q[0].endsWith("Id")) {
                query[q[0]] = q[1]?.toString();
                if (mongoose.Types.ObjectId.isValid(q[1]?.toString())) {
                    query[q[0]] = new mongoose.Types.ObjectId(`${q[1]?.toString()}`);
                }
            }
        });
        return query;
    }

    fetchAndSortFromSearchQueryWithRelations(searchQuery: any, options = {}) {
        const records = this.mongoModel
            .aggregate(this.aggregateStages(searchQuery.search, searchQuery.sort, options))
            .allowDiskUse(true);

        // if (searchQuery.sort) {
        //     records = this.sort(searchQuery.sort, records);
        // }

        return records;
    }

    sort(sortQuery: any, records: any) {
        const sort: any = {};
        for (const key in sortQuery) {
            sort[key] = {};
            sort[key] = parseInt(sortQuery[key], 10);
        }

        return records.sort(sort);
    }

    async paginate(searchQuery: any, options = {}) {
        const page: number = searchQuery.page ? parseInt(searchQuery.page as any) : 1;
        const limit = searchQuery.limit ? parseInt(searchQuery.limit as any) : 10;
        const total = await this.count(searchQuery.search);

        const data = await this.mongoModel
            .aggregate(this.aggregateStages(searchQuery.search, searchQuery.sort, options))
            // .sort(searchQuery.sort || {})
            .skip((page - 1) * limit)
            .limit(limit)
            .allowDiskUse(true)
            .exec();
        return {
            data: data,
            paginationData: {
                page: page,
                limit: limit,
                count: data.length,
                total: total,
                last: Math.ceil(total / limit),
            },
        };
    }

    // async uploadAttachmentAndSetData(data: any, destination: any, key = "attachemnt") {
    //     const tempData = { ...data };
    //     const attachment = data[key];
    //     if (attachment) {
    //         const uploadedFile = await this.awsS3Service.uploadFile(
    //             attachment,
    //             genFileNameWithDate(attachment.originalName),
    //             destination,
    //         );

    //         if (uploadedFile) {
    //             Object.assign(tempData, {
    //                 attachment: <Attachment>{
    //                     filename: attachment.originalName,
    //                     url: uploadedFile?.Location,
    //                 },
    //             });
    //         }
    //     }
    //     // data = { ...tempData };
    //     return tempData;
    // }

    async uploadImageAndSetData(data: any, destination: any, prefix: string | null = null) {
        const tempData = { ...data };
        const image = data["image"];

        if (prefix) prefix = prefix + "-";

        Object.assign(tempData, { image: null });
        if (image) {
            const filename = prefix + genFileNameWithDate(image.originalName);
            // const uploadedFile = await this.awsS3Service.uploadImage(image, filename, destination);

            // if (uploadedFile) {
            //     tempData.images.push(<Attachment>{ filename, url: uploadedFile?.Location });
            // }
        }
        // data = { ...tempData };
        return tempData;
    }

    async uploadImagesAndSetData(data: any, destination: any, prefix: string | null = null) {
        const tempData = { ...data };
        const images = data["images"];
        if (!images && !Array.isArray(images)) return tempData;

        if (prefix) prefix = prefix + "-";

        Object.assign(tempData, { images: [] });
        for (const image of images) {
            if (image) {
                const filename = prefix + genFileNameWithDate(image.originalName);
                // const uploadedFile = await this.awsS3Service.uploadImage(image, filename, destination);

                // if (uploadedFile) {
                //     tempData.images.push(<Attachment>{ filename, url: uploadedFile?.Location });
                // }
            }
        }
        // data = { ...tempData };
        return tempData;
    }

    async updatePublishStatus(id: string, publishStatus: PublishStateEnum) {
        return this.findOneAndUpdate({ _id: id }, { publishedStatus: publishStatus });
    }

    async makeHashedPassword(password: any) {
        const saltOrRounds = 10;
        return await bcrypt.hash(password.toString(), saltOrRounds);
    }

    throwBadRequestException(message: any, error: any) {
        throw new BadRequestException(
            {
                statusText: "fail",
                message: message,
                error: error,
            },
            {
                cause: error,
            },
        );
    }

    throwNotFoundException(message: string) {
        throw new NotFoundException({
            statusText: "fail",
            message: message,
        });
    }

    throwConflictException(message: string, error: any) {
        throw new ConflictException(
            {
                statusText: "fail",
                message: message,
                errors: error.keyValue,
            },
            {
                cause: error,
            },
        );
    }

    throwInternalServerException(message: string, error: any = []) {
        throw new InternalServerErrorException(
            {
                statusText: "fail",
                message: message,
            },
            {
                cause: error,
            },
        );
    }

    rootDir() {
        return path.join(__dirname, "..");
    }

    moveToPublic(filePath: string) {
        const destination = path.join(this.rootDir(), "public", filePath);
        try {
            fs.renameSync(path.join(this.rootDir(), filePath), destination);
            return { path: destination, url: "/" + filePath.toString().replaceAll("\\", "/") };
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async delete(data: any) {
        return await this.findOneAndUpdate(data, { deletedAt: new Date() });
    }

    async restore(data: any) {
        return await this.findOneAndUpdate(data, { deletedAt: null });
    }
}
