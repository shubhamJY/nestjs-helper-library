import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";

@Injectable()
export class Awss3Service {
    AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
    AWS_S3_REGION = process.env.AWS_S3_REGION;
    s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_KEY_SECRET,
    });

    async uploadFile(file: any, fileName: string, desitination = "") {
        // const { originalname } = file;
        fileName = `${desitination}/${fileName}`;
        return await this.s3_upload(file.buffer, this.AWS_S3_BUCKET, fileName, file.mimetype);
    }

    async s3_upload(file: any, bucket: string | any, name = "", mimetype: string) {
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ACL: "public-read",
            ContentType: mimetype,
            ContentDisposition: "inline",
            CreateBucketConfiguration: {
                LocationConstraint: this.AWS_S3_REGION,
            },
        };

        try {
            const s3Response = await this.s3.upload(params).promise();
            return s3Response;
        } catch (e) {
            console.error(e);
        }
    }
}
