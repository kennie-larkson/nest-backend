"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const fs_1 = require("fs");
const path_1 = require("path");
const uuid_1 = require("uuid");
const config_1 = require("@nestjs/config");
const error_handling_1 = require("../error-handling/error-handling");
let FileUploadService = class FileUploadService {
    constructor(configService) {
        this.configService = configService;
        (this.cloudName = this.configService.get('CLOUDINARY_NAME')),
            (this.API_KEY = this.configService.get('CLOUDINARY_API_KEY')),
            (this.API_SECRET = this.configService.get('CLOUDINARY_API_SECRET')),
            (this.public_id = this.configService.get('CLOUDINARY_PUBLIC_ID'));
        this.upload_folder = this.configService.get('CLOUDINARY_PROFILE_PIC');
    }
    config() {
        try {
            return cloudinary_1.v2.config({
                cloud_name: this.cloudName,
                api_key: this.API_KEY,
                api_secret: this.API_SECRET,
            });
        }
        catch (error) {
            throw new Error(`Cloudinary config error: ${error.message}`);
        }
    }
    async fileNameGenerator(file) {
        const uploadPath = './uploads';
        try {
            (0, fs_1.rmSync)(uploadPath, { recursive: true, force: true });
            (0, fs_1.mkdirSync)(uploadPath);
            const uniqueFilename = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
            const filePath = `${uploadPath}/${uniqueFilename}`;
            await new Promise((resolve, reject) => {
                require('fs').writeFile(filePath, file.buffer, async (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
            return filePath;
        }
        catch (error) {
            throw new error_handling_1.FileNameGeneratorError(error);
        }
    }
    async fileUploader(uniqueFilename) {
        try {
            const uploadResult = await cloudinary_1.v2.uploader.upload(uniqueFilename, {
                public_id: this.public_id,
                use_filename: true,
                folder: this.upload_folder,
            });
            uploadResult;
            return uploadResult;
        }
        catch (error) {
            throw new error_handling_1.CloudinaryUploadError(error);
        }
    }
    fileFormatter() {
        let formatOptions;
        const optimizeUrl = cloudinary_1.v2.url(this.public_id, formatOptions);
    }
    fileTransformer(transformOptions) {
        const autoCropUrl = cloudinary_1.v2.url(this.public_id, transformOptions);
    }
};
FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FileUploadService);
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=file-upload.service.js.map