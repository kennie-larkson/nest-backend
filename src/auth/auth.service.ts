import { Injectable } from '@nestjs/common';
import { LoginResponse } from '../user/dto/create-user.dto';
import { IAuthService } from './interfaces/auth-service.interface';
import { AuthTokenService } from '../utilities/generate-token';
import {
  UserNotFoundException,
  WrongAccountPasswordException,
} from '../error-handling/error-handling';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private authToken: AuthTokenService,
  ) {}

  async signIn(email: string, password: string): Promise<LoginResponse> {
    try {
      const user = await this.usersRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new UserNotFoundException(email);
      }

      const verifySuccess = await bcrypt.compare(password, user?.password);
      if (!verifySuccess) {
        throw new WrongAccountPasswordException(email);
      }

      const payload = { id: user.id, email };
      const { access_token: _, ...registeredUser } = user;
      return {
        message: 'User signin successful',
        access_token: await this.authToken.generateToken(payload),
        registeredUser,
      };
    } catch (error) {
      console.error('Error during user login:', error);
      throw error;
    }
  }
}
