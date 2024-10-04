import { CreatedUser, CreateUserDto, LoginResponse } from './../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { UserService } from '../user/user.service';
export declare class AuthController {
    private readonly authService;
    service: UserService;
    constructor(authService: AuthService, service: UserService);
    signup(dto: CreateUserDto): Promise<CreatedUser>;
    login(dto: SignInDto): Promise<LoginResponse>;
}
