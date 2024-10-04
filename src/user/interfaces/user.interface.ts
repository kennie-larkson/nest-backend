import { DeepPartial } from 'typeorm';
import { CreatedUser, CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

export interface CreateUser {
  fname: string;
  lname: string;
  email: string;
  password: string;
  gender: string;
}

export interface ReturnedUser {
  id: number;
  fname: string;
  lname: string;
  email: string;
  gender: string;
}

export interface IUserService {
  signUp(dto: DeepPartial<User>): Promise<CreatedUser>;
}
