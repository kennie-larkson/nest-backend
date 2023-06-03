import { IsEmail, IsNotEmpty } from 'class-validator';
import User from '../interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements User {
  @ApiProperty({ description: 'unique id of the user', type: Number })
  id: number;

  @ApiProperty({
    description: 'name of the user must be provided in the body of the request',
    type: 'string',
  })
  name: string;

  @ApiProperty({ description: 'must be a valid email format', type: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'password must be provided', type: 'string' })
  @IsNotEmpty({})
  password: string;
  // gender: string;
  // age: number;
  // complexion: string;
  // friends: string[];
}
