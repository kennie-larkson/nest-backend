import User from '../interfaces/user.interface';
export class CreateUserDto implements User {
  name: string;
  email: string;
  password: string;
  // gender: string;
  // age: number;
  // complexion: string;
  // friends: string[];
}
