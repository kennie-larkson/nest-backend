import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import { CreateUser } from '../interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';

export enum UserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  male = 'male',
  female = 'female',
}

export enum Roles {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}

export class CreateUserDto implements CreateUser {
  @ApiProperty({
    description: 'This is the first name property of the user to be created.',
    example: 'kennie',
    required: true,
  })
  @IsNotEmpty()
  fname: string;

  @ApiProperty({
    description: 'This is the last name property of the user to be created.',
    example: 'kennie',
    required: true,
  })
  @IsNotEmpty()
  lname: string;

  @ApiProperty({
    description: 'This is the email for the user to be created.',
    uniqueItems: true,
    example: 'kennie@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'This is the password for the user to be created.',
    minimum: 8,
    required: true,
    example: '12345678',
  })
  @IsNotEmpty({})
  @Length(8)
  password: string;

  @IsEnum(UserGender)
  @IsNotEmpty()
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
