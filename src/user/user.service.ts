import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReturnedUser } from './interfaces/user.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, //   @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async create(user: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser)
      throw new ConflictException({ message: 'User already exists' });
    return await this.userModel.create(user);
  }
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    //await this.cacheManager.set('users', users);
    return users;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user)
      throw new NotFoundException({
        statusCode: 404,
        message: "There's no user with such email",
      });
    return user;
  }
  // async update(email: string, updateUserDto: UpdateUserDto) {
  //   return await this.userModel.findOneAndUpdate({ email }, updateUserDto);
  // }
  // async remove(email: string) {
  //   return await this.userModel.deleteOne({ email });
  // }
  // async removeAll() {
  //   return await this.userModel.deleteMany();
  // }
}
