import { IsEmail, IsEnum, IsNotEmpty, Length } from 'class-validator';
import User from '../interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';

export enum UserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  male = 'male',
  female = 'female',
}

export class CreateUserDto implements User {
  @ApiProperty({
    description: 'This is a unique id for the user to be created.',
    example: 2,
  })
  id: number;

  @ApiProperty({
    description: 'This is the first name property of the user to be created.',
    example: 'kennie',
    required: true,
  })
  fname: string;

  @ApiProperty({
    description: 'This is the last name property of the user to be created.',
    example: 'kennie',
    required: true,
  })
  lname: string;

  @ApiProperty({
    description: 'This is the email for the user to be created.',
    uniqueItems: true,
    example: 'kennie@email.com',
  })
  @IsEmail()
  @IsNotEmpty({})
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
