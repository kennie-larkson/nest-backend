import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { BaseCrudService } from '../../common/base-crud.service';
import { AuthTokenService } from '../../utilities/generate-token';
export declare class UserRepository extends BaseCrudService<User> {
    readonly userRepo: Repository<User>;
    private readonly authTokenService;
    constructor(userRepo: Repository<User>, authTokenService: AuthTokenService);
}
