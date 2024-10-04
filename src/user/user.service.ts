import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthTokenService } from '../utilities/generate-token';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import {
  UserAlreadyExistsException,
  UserNotFoundException,
} from '../error-handling/error-handling';
import { CreatedUser } from './dto/create-user.dto';
import { FileUploadService } from '../file-hosting/file-upload.service';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authToken: AuthTokenService,
    private fileUploadService: FileUploadService,
  ) {
    super(userRepository);
    this.fileUploadService.config();
  }
  async signUp(dto: DeepPartial<User>): Promise<CreatedUser> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (existingUser) {
        throw new UserAlreadyExistsException(existingUser.email);
      }
      const user = new User();
      (user.access_token = ''),
        (user.email = dto.email),
        (user.fname = dto.fname),
        (user.gender = dto.gender),
        (user.lname = dto.lname),
        (user.password = dto.password);

      const savedUser = this.userRepository.create(user);

      const { id, email } = savedUser;
      const access_token = await this.authToken.generateToken({
        id,
        email,
      });
      savedUser.access_token = access_token;
      const { access_token: _, ...registeredUser } =
        await this.userRepository.save(savedUser);

      return {
        message: 'User registration successful.',
        access_token,
        registeredUser,
      };
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UserNotFoundException(user.email);
    }
    return user;
  }

  async uploadProfilePicture(
    userId: string,
    file: Express.Multer.File,
  ): Promise<{ 'profile-picture-url': string }> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new UserNotFoundException(userId);
      }

      const fileName = await this.fileUploadService.fileNameGenerator(file);

      const uploadResponse = await this.fileUploadService.fileUploader(
        fileName,
      );

      user.profilePicture = uploadResponse.url;
      this.userRepository.save(user);
      return { 'profile-picture-url': user.profilePicture };
    } catch (error) {
      throw new InternalServerErrorException(
        'File Upload Error',
        error.message,
      );
    }
  }
}
