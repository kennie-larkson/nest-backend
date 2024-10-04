import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './../../user/dto/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto extends PartialType(CreateUserDto) {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
