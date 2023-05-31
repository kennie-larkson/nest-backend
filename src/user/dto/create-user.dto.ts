import User from '../interfaces/user.interface';
export class CreateUserDto implements User {
  name: string;
  gender: string;
  age: number;
  complexion: string;
  friends: string[];
}
