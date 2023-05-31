import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      name: 'Kennie',
      gender: 'male',
      complexion: 'dark',
      age: 20,
      friends: ['Wale', 'Sheriff'],
    },
  ];

  create(user: CreateUserDto) {
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
