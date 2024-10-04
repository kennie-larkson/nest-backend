"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileNameGeneratorError = exports.CloudinaryUploadError = exports.FileUploadServiceError = exports.WrongAuthenticationTokenException = exports.AuthenticationTokenRequiredException = exports.WrongAccountPasswordException = exports.UserNotFoundException = exports.UserAlreadyExistsException = void 0;
const common_1 = require("@nestjs/common");
class UserAlreadyExistsException extends common_1.ConflictException {
    constructor(email) {
        super(`A user with the email: ${email} already exists.`);
    }
}
exports.UserAlreadyExistsException = UserAlreadyExistsException;
class UserNotFoundException extends common_1.NotFoundException {
    constructor(email) {
        super(`No user found with the provided identification: ${email}.`);
    }
}
exports.UserNotFoundException = UserNotFoundException;
class WrongAccountPasswordException extends common_1.UnauthorizedException {
    constructor(email) {
        super(`The password provided does not match the email: ${email}.`);
    }
}
exports.WrongAccountPasswordException = WrongAccountPasswordException;
class AuthenticationTokenRequiredException extends common_1.UnauthorizedException {
    constructor() {
        super(`Your session seems to have expired. Kindly login please.`);
    }
}
exports.AuthenticationTokenRequiredException = AuthenticationTokenRequiredException;
class WrongAuthenticationTokenException extends common_1.UnauthorizedException {
    constructor() {
        super(`Wrong Authentication token provided.`);
    }
}
exports.WrongAuthenticationTokenException = WrongAuthenticationTokenException;
class FileUploadServiceError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.FileUploadServiceError = FileUploadServiceError;
class CloudinaryUploadError extends FileUploadServiceError {
    constructor(error) {
        super(`Cloudinary upload error: ${error}`);
    }
}
exports.CloudinaryUploadError = CloudinaryUploadError;
class FileNameGeneratorError extends FileUploadServiceError {
    constructor(error) {
        super(`Error : ${error}`);
    }
}
exports.FileNameGeneratorError = FileNameGeneratorError;
//# sourceMappingURL=error-handling.js.map