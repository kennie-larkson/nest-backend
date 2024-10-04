import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
export declare class UserAlreadyExistsException extends ConflictException {
    constructor(email: string);
}
export declare class UserNotFoundException extends NotFoundException {
    constructor(email: string);
}
export declare class WrongAccountPasswordException extends UnauthorizedException {
    constructor(email: string);
}
export declare class AuthenticationTokenRequiredException extends UnauthorizedException {
    constructor();
}
export declare class WrongAuthenticationTokenException extends UnauthorizedException {
    constructor();
}
export declare class FileUploadServiceError extends Error {
    constructor(message: string);
}
export declare class CloudinaryUploadError extends FileUploadServiceError {
    constructor(error: Error);
}
export declare class FileNameGeneratorError extends FileUploadServiceError {
    constructor(error: Error);
}
