import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import {
  UserNotFoundException,
  WrongAccountPasswordException,
} from '../error-handling/error-handling';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthTokenService } from '../utilities/generate-token';
import { AuthModule } from './auth.module';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: AuthTokenService,
          useValue: {
            generateToken: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should log in a user successfully', async () => {
    const user: User = {
      email: 'test@example.com',
      password: await bcrypt.hash('password', 10),
      id: '',
      fname: '',
      lname: '',
      gender: '',
      role: '',
      access_token: '',
      hashPassword: jest.fn(),
    };
    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(true));

    const result = await service.signIn(user.email, 'password');
    expect(result.message).toBe('User signin successful');
  });

  it('should throw an error if the user does not exist', async () => {
    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null);

    await expect(
      service.signIn('nonexistent@example.com', 'password'),
    ).rejects.toThrow(UserNotFoundException);
  });

  it('should throw an error if the password is incorrect', async () => {
    const user: User = {
      email: 'test@example.com',
      password: await bcrypt.hash('password', 10),
      id: '',
      fname: '',
      lname: '',
      gender: '',
      role: '',
      access_token: '',
      hashPassword: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
    };
    jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(true));

    await expect(service.signIn(user.email, 'wrongpassword')).rejects.toThrow(
      WrongAccountPasswordException,
    );
  });
});
