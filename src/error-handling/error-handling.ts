import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class UserAlreadyExistsException extends ConflictException {
  constructor(email: string) {
    super(`A user with the email: ${email} already exists.`);
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor(email: string) {
    super(`No user found with the provided identification: ${email}.`);
  }
}

export class WrongAccountPasswordException extends UnauthorizedException {
  constructor(email: string) {
    super(`The password provided does not match the email: ${email}.`);
  }
}

export class AuthenticationTokenRequiredException extends UnauthorizedException {
  constructor() {
    super(`Your session seems to have expired. Kindly login please.`);
  }
}

export class WrongAuthenticationTokenException extends UnauthorizedException {
  constructor() {
    super(`Wrong Authentication token provided.`);
  }
}

export class FileUploadServiceError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class CloudinaryUploadError extends FileUploadServiceError {
  constructor(error: Error) {
    super(`Cloudinary upload error: ${error}`);
  }
}

export class FileNameGeneratorError extends FileUploadServiceError {
  constructor(error: Error) {
    super(`Error : ${error}`);
  }
}
