/// <reference types="multer" />
import { UploadApiResponse } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { FileTransformOptionsType } from './file.interface';
export declare class FileUploadService {
    private configService;
    private cloudName;
    private API_KEY;
    private API_SECRET;
    private public_id;
    upload_folder: string;
    constructor(configService: ConfigService);
    config(): import("cloudinary").ConfigOptions;
    fileNameGenerator(file: Express.Multer.File): Promise<string>;
    fileUploader(uniqueFilename: string): Promise<UploadApiResponse>;
    fileFormatter(): void;
    fileTransformer(transformOptions: FileTransformOptionsType): void;
}
