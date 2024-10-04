import { CreateUserDto } from './../../user/dto/create-user.dto';
declare const SignInDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class SignInDto extends SignInDto_base {
    email: string;
    password: string;
}
export {};
