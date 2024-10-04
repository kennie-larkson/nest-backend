import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BloggingService } from './blogging.service';
import { CreatePostDto, CreateCommentDto } from './dto/create-post.dto';
import { User } from '../user/entities/user.entity';
import { GetUser } from '../auth/decorators/getuser.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('blogging')
export class BloggingController {
  constructor(private readonly bloggingService: BloggingService) {}

  @Post('posts')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() author: { id: string; email: string },
  ) {
    return this.bloggingService.createPost(createPostDto, author, file);
  }

  @Get('posts')
  getPosts() {
    return this.bloggingService.getPosts();
  }

  @Get('posts/:id')
  findOne(@Param('id') id: string) {
    return this.bloggingService.getPost(id);
  }

  @Get('posts/author/:id')
  findPostByAuthor(@Param('id') id: string) {
    return this.bloggingService.getPostByAuthor(id);
  }

  @Post('posts/:id/comments')
  @UseGuards(AuthGuard)
  createComment(
    @Param('id') postId: string,
    @Body() createCommenDto: CreateCommentDto,
    @GetUser() author: User,
  ) {
    return this.bloggingService.createComment(createCommenDto, author, postId);
  }

  /*  @Post(':id/post-file')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @Param('id') postId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('got here');
    return this.bloggingService.uploadPostFile(postId, file);
  } */
}
