import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTokenService } from '../utilities/generate-token';
import { UserRepository } from './repository/user.repository';
import { FileUploadService } from '../file-hosting/file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    FileUploadService,
    {
      provide: AuthTokenService,
      useClass: AuthTokenService,
    },
  ],
  exports: [UserService, TypeOrmModule, AuthTokenService],
})
export class UserModule {}
