import { IsEmail, IsNotEmpty } from 'class-validator';
import User from '../interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements User {
  @ApiProperty({
    description: 'This is a unique id for the user to be created.',
    example: 2,
  })
  id: number;

  @ApiProperty({
    description: 'This is the name property of the user to be created.',
    example: 'kennie',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'This is the email for the user to be created.',
    uniqueItems: true,
    example: 'kennie@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'This is the password for the user to be created.',
    minimum: 6,
    required: true,
    example: '123456',
  })
  @IsNotEmpty({})
  password: string;
}
