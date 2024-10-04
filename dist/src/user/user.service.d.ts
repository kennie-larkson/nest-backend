/// <reference types="multer" />
import { DeepPartial, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthTokenService } from '../utilities/generate-token';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { CreatedUser } from './dto/create-user.dto';
import { FileUploadService } from '../file-hosting/file-upload.service';
export declare class UserService extends TypeOrmCrudService<User> {
    private userRepository;
    private authToken;
    private fileUploadService;
    constructor(userRepository: Repository<User>, authToken: AuthTokenService, fileUploadService: FileUploadService);
    signUp(dto: DeepPartial<User>): Promise<CreatedUser>;
    findByEmail(email: string): Promise<User>;
    uploadProfilePicture(userId: string, file: Express.Multer.File): Promise<{
        'profile-picture-url': string;
    }>;
}
