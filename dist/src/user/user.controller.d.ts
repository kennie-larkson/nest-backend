/// <reference types="multer" />
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CrudController } from '@dataui/crud';
export declare class UserController implements CrudController<User> {
    service: UserService;
    constructor(service: UserService);
    uploadProfilePicture(userId: string, file: Express.Multer.File): Promise<{
        'profile-picture-url': string;
    }>;
}
