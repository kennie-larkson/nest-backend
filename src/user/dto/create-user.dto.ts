import { IsEmail, IsNotEmpty } from 'class-validator';
import User from '../interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({})
  password: string;
  // gender: string;
  // age: number;
  // complexion: string;
  // friends: string[];
}
