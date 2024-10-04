import { Module } from '@nestjs/common';
import { BloggingService } from './blogging.service';
import { BloggingController } from './blogging.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { UserModule } from '../user/user.module';
import { FileUploadService } from '../file-hosting/file-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment]), UserModule],
  controllers: [BloggingController],
  providers: [BloggingService, FileUploadService],
})
export class BloggingModule {}
