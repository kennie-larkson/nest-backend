import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class SignInDto extends PartialType(CreateUserDto) {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
