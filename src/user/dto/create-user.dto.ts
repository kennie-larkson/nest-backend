import { IsEmail, IsNotEmpty } from 'class-validator';
import User from '../interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements User {
  id: number;

  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty({})
  password: string;
}
