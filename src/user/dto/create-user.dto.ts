import { IsEmail, IsNotEmpty } from 'class-validator';
import User from '../interfaces/user.interface';
export class CreateUserDto implements User {
  id: number;
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty({})
  password: string;
  // gender: string;
  // age: number;
  // complexion: string;
  // friends: string[];
}
