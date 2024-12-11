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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Awss3Service = void 0;
const common_1 = require("@nestjs/common");
const AWS = __importStar(require("aws-sdk"));
let Awss3Service = class Awss3Service {
    constructor() {
        this.AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
        this.AWS_S3_REGION = process.env.AWS_S3_REGION;
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY,
            secretAccessKey: process.env.AWS_S3_KEY_SECRET,
        });
    }
    uploadFile(file_1, fileName_1) {
        return __awaiter(this, arguments, void 0, function* (file, fileName, desitination = "") {
            // const { originalname } = file;
            fileName = `${desitination}/${fileName}`;
            return yield this.s3_upload(file.buffer, this.AWS_S3_BUCKET, fileName, file.mimetype);
        });
    }
    s3_upload(file_1, bucket_1) {
        return __awaiter(this, arguments, void 0, function* (file, bucket, name = "", mimetype) {
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
                const s3Response = yield this.s3.upload(params).promise();
                return s3Response;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
};
exports.Awss3Service = Awss3Service;
exports.Awss3Service = Awss3Service = __decorate([
    (0, common_1.Injectable)()
], Awss3Service);
//# sourceMappingURL=awss3.service.js.map