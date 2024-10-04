import { CreateUser } from '../interfaces/user.interface';
export declare enum UserGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    male = "male",
    female = "female"
}
export declare enum Roles {
    ADMIN = "ADMIN",
    GUEST = "GUEST"
}
export declare class CreateUserDto implements CreateUser {
    fname: string;
    lname: string;
    email: string;
    password: string;
    gender: string;
}
interface RegisteredUser {
    id: string;
    fname: string;
    lname: string;
    email: string;
    gender: string;
    password: string;
}
export interface CreatedUser {
    message: string;
    access_token: string;
    registeredUser: RegisteredUser;
}
export interface LoginResponse {
    message: string;
    access_token: string;
    registeredUser: RegisteredUser;
}
export interface GenerateTokenDto {
    id: string;
    email: string;
}
export {};
