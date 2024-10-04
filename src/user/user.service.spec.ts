import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserAlreadyExistsException } from '../error-handling/error-handling';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthTokenService } from '../utilities/generate-token';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;
  let authTokenService: AuthTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
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

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    authTokenService = module.get<AuthTokenService>(AuthTokenService);
  });

  it('should register a user successfully', async () => {
    const dto = {
      email: 'test@example.com',
      password: 'password',
      fname: 'John',
      lname: 'Doe',
      gender: 'MALE',
    };
    userRepository.findOne = jest.fn().mockResolvedValue(null); // No existing user
    userRepository.create = jest.fn().mockReturnValue(dto);
    userRepository.save = jest
      .fn()
      .mockResolvedValue({ ...dto, id: 'user-id' });
    authTokenService.generateToken = jest
      .fn()
      .mockResolvedValue('mocked-token');

    const result = await service.signUp(dto);
    expect(result.message).toBe('User registration successful.');
    expect(result.access_token).toBe('mocked-token');
    //expect(result.registeredUser).toEqual(expect.objectContaining(dto));
  });

  it('should throw an error if the user already exists', async () => {
    const dto = { email: 'test@example.com' };
    userRepository.findOne = jest.fn().mockResolvedValue(dto); // Existing user

    await expect(service.signUp(dto)).rejects.toThrow(
      UserAlreadyExistsException,
    );
  });
});
