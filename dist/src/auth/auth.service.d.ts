import { LoginResponse } from '../user/dto/create-user.dto';
import { IAuthService } from './interfaces/auth-service.interface';
import { AuthTokenService } from '../utilities/generate-token';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService implements IAuthService {
    private usersRepository;
    private authToken;
    constructor(usersRepository: Repository<User>, authToken: AuthTokenService);
    signIn(email: string, password: string): Promise<LoginResponse>;
}
