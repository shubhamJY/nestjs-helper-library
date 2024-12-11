"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const filesystem_1 = require("../helpers/filesystem");
const uuid_1 = require("uuid");
let BaseService = class BaseService {
    constructor(mongoModel) {
        this.mongoModel = mongoModel;
        // @Inject(Awss3Service)
        // private awsS3Service: Awss3Service;
        this.relations = {};
    }
    model() {
        return this.mongoModel;
    }
    count(query = {}) {
        return this.mongoModel.where(query).countDocuments();
    }
    create(data) {
        Object.assign(data, { uuid: (0, uuid_1.v4)() });
        return this.mongoModel.create(data);
    }
    findOneAndUpdate(filter, data) {
        return this.mongoModel.findOneAndUpdate(filter, data, { returnOriginal: false });
    }
    find(query, options = {}) {
        return this.mongoModel.find(query, options);
    }
    findExceptId(query, _id, options = {}) {
        Object.assign(query, { _id: { $ne: _id } });
        return this.mongoModel.find(query, options);
    }
    findOne(query, options = {}) {
        return this.mongoModel.findOne(query, options);
    }
    aggregate(stages) {
        return this.mongoModel.aggregate(stages).allowDiskUse(true);
    }
    aggregatePipes(options = {}) {
        const withRelations = options.hasOwnProperty("withRelations") ? options.withRelations : [];
        let relations = [];
        withRelations.map((r) => {
            if (this.relations.hasOwnProperty(r)) {
                relations = [...relations, ...this.relations[r]];
            }
        });
        return relations;
        // return [];
    }
    aggregateStages(match, sort = { createdAt: -1 }, options = {}) {
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
    withRelations(match_1) {
        return __awaiter(this, arguments, void 0, function* (match, sort = { createdAt: -1 }, options = {}) {
            return this.aggregate(this.aggregateStages(match, sort, options)).allowDiskUse(true);
        });
    }
    withAllRelations(query_1) {
        return __awaiter(this, arguments, void 0, function* (query, sort = { createdAt: -1 }, options = {}) {
            Object.assign(options, { withRelations: Object.keys(this.relations) });
            return this.aggregate(this.aggregateStages(query, sort, options)).allowDiskUse(true);
        });
    }
    makeSearchObjectFromQueryParam(query) {
        const ids = [];
        Object.entries(query)
            .filter((o) => o[0] === "_id")
            // .map((r) => new mongoose.Types.ObjectId(r[1].toString()));
            .map((r) => {
            if (typeof r[1] == "string") {
                // return new mongoose.Types.ObjectId(`${r[1].toString()}`);
                ids.push(new mongoose_1.default.Types.ObjectId(`${r[1].toString()}`));
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
            query = Object.assign(Object.assign({}, query), { _id: { $in: ids } });
        }
        Object.entries(query).map((q, i) => {
            var _a;
            if (q[0].endsWith("Id")) {
                query[q[0]] = new mongoose_1.default.Types.ObjectId(`${(_a = q[1]) === null || _a === void 0 ? void 0 : _a.toString()}`);
            }
        });
        return query;
    }
    fetchAndSortFromSearchQueryWithRelations(searchQuery, options = {}) {
        const records = this.mongoModel
            .aggregate(this.aggregateStages(searchQuery.search, searchQuery.sort, options))
            .allowDiskUse(true);
        // if (searchQuery.sort) {
        //     records = this.sort(searchQuery.sort, records);
        // }
        return records;
    }
    sort(sortQuery, records) {
        const sort = {};
        for (const key in sortQuery) {
            sort[key] = {};
            sort[key] = parseInt(sortQuery[key], 10);
        }
        return records.sort(sort);
    }
    paginate(searchQuery_1) {
        return __awaiter(this, arguments, void 0, function* (searchQuery, options = {}) {
            const page = searchQuery.page ? parseInt(searchQuery.page) : 1;
            const limit = searchQuery.limit ? parseInt(searchQuery.limit) : 10;
            const total = yield this.count(searchQuery.search);
            const data = yield this.mongoModel
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
        });
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
    uploadImageAndSetData(data_1, destination_1) {
        return __awaiter(this, arguments, void 0, function* (data, destination, prefix = null) {
            const tempData = Object.assign({}, data);
            const image = data["image"];
            if (prefix)
                prefix = prefix + "-";
            Object.assign(tempData, { image: null });
            if (image) {
                const filename = prefix + (0, filesystem_1.genFileNameWithDate)(image.originalName);
                // const uploadedFile = await this.awsS3Service.uploadImage(image, filename, destination);
                // if (uploadedFile) {
                //     tempData.images.push(<Attachment>{ filename, url: uploadedFile?.Location });
                // }
            }
            // data = { ...tempData };
            return tempData;
        });
    }
    uploadImagesAndSetData(data_1, destination_1) {
        return __awaiter(this, arguments, void 0, function* (data, destination, prefix = null) {
            const tempData = Object.assign({}, data);
            const images = data["images"];
            if (!images && !Array.isArray(images))
                return tempData;
            if (prefix)
                prefix = prefix + "-";
            Object.assign(tempData, { images: [] });
            for (const image of images) {
                if (image) {
                    const filename = prefix + (0, filesystem_1.genFileNameWithDate)(image.originalName);
                    // const uploadedFile = await this.awsS3Service.uploadImage(image, filename, destination);
                    // if (uploadedFile) {
                    //     tempData.images.push(<Attachment>{ filename, url: uploadedFile?.Location });
                    // }
                }
            }
            // data = { ...tempData };
            return tempData;
        });
    }
    updatePublishStatus(id, publishStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOneAndUpdate({ _id: id }, { publishedStatus: publishStatus });
        });
    }
    makeHashedPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const saltOrRounds = 10;
            return yield bcrypt.hash(password.toString(), saltOrRounds);
        });
    }
    throwBadRequestException(message, error) {
        throw new common_1.BadRequestException({
            statusText: "fail",
            message: message,
            error: error,
        }, {
            cause: error,
        });
    }
    throwNotFoundException(message) {
        throw new common_1.NotFoundException({
            statusText: "fail",
            message: message,
        });
    }
    throwConflictException(message, error) {
        throw new common_1.ConflictException({
            statusText: "fail",
            message: message,
            errors: error.keyValue,
        }, {
            cause: error,
        });
    }
    throwInternalServerException(message, error = []) {
        throw new common_1.InternalServerErrorException({
            statusText: "fail",
            message: message,
        }, {
            cause: error,
        });
    }
    rootDir() {
        return path.join(__dirname, "..");
    }
    moveToPublic(filePath) {
        const destination = path.join(this.rootDir(), "public", filePath);
        try {
            fs.renameSync(path.join(this.rootDir(), filePath), destination);
            return { path: destination, url: "/" + filePath.toString().replaceAll("\\", "/") };
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
    delete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOneAndUpdate(data, { deletedAt: new Date() });
        });
    }
    restore(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOneAndUpdate(data, { deletedAt: null });
        });
    }
};
exports.BaseService = BaseService;
exports.BaseService = BaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], BaseService);
//# sourceMappingURL=BaseService.js.map