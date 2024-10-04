import { Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { existsSync, mkdirSync, rmdirSync, rmSync } from 'fs';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import {
  CloudinaryUploadError,
  FileNameGeneratorError,
} from '../error-handling/error-handling';
import { FileTransformOptionsType } from './file.interface';

@Injectable()
export class FileUploadService {
  private cloudName: string;
  private API_KEY: string;
  private API_SECRET: string;
  private public_id: string;
  upload_folder: string;

  constructor(private configService: ConfigService) {
    (this.cloudName = this.configService.get<string>('CLOUDINARY_NAME')),
      (this.API_KEY = this.configService.get<string>('CLOUDINARY_API_KEY')),
      (this.API_SECRET = this.configService.get<string>(
        'CLOUDINARY_API_SECRET',
      )),
      (this.public_id = this.configService.get<string>('CLOUDINARY_PUBLIC_ID'));
    this.upload_folder = this.configService.get<string>(
      'CLOUDINARY_PROFILE_PIC',
    );
  }

  config() {
    try {
      return cloudinary.config({
        cloud_name: this.cloudName,
        api_key: this.API_KEY,
        api_secret: this.API_SECRET,
      });
    } catch (error) {
      throw new Error(`Cloudinary config error: ${error.message}`);
    }
  }

  async fileNameGenerator(file: Express.Multer.File) {
    const uploadPath = './uploads';
    try {
      rmSync(uploadPath, { recursive: true, force: true });
      mkdirSync(uploadPath);
      const uniqueFilename = `${uuid()}${extname(file.originalname)}`;

      const filePath = `${uploadPath}/${uniqueFilename}`;

      await new Promise<void>((resolve, reject) => {
        require('fs').writeFile(filePath, file.buffer, async (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      return filePath;
    } catch (error) {
      throw new FileNameGeneratorError(error);
    }
  }

  // Upload an image
  async fileUploader(uniqueFilename: string): Promise<UploadApiResponse> {
    try {
      const uploadResult = await cloudinary.uploader.upload(uniqueFilename, {
        public_id: this.public_id,
        use_filename: true,
        folder: this.upload_folder,
      });
      uploadResult;
      return uploadResult as UploadApiResponse;
    } catch (error) {
      throw new CloudinaryUploadError(error);
    }
  }

  // Optimize delivery by resizing and applying auto-format and auto-quality
  fileFormatter() {
    let formatOptions: { fetch_format: string; quality: string };
    const optimizeUrl = cloudinary.url(this.public_id, formatOptions);
  }

  // Transform the image: auto-crop to square aspect_ratio
  fileTransformer(transformOptions: FileTransformOptionsType) {
    const autoCropUrl = cloudinary.url(this.public_id, transformOptions);
  }
}
