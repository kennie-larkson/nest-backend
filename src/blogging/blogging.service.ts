import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto, CreateCommentDto } from './dto/create-post.dto';
import { User } from '../user/entities/user.entity';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNotFoundException } from '../error-handling/error-handling';
import {
  CloudinaryUploadError,
  FileNameGeneratorError,
} from '../error-handling/error-handling';
import { FileUploadService } from '../file-hosting/file-upload.service';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class BloggingService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private fileUploadService: FileUploadService,
  ) {
    this.fileUploadService.config();
  }
  async createPost(
    createPostDto: CreatePostDto,
    user: { id: string; email: string },
    file: Express.Multer.File,
  ): Promise<Post> {
    try {
      const author = await this.userRepository.findOne({
        where: { id: user.id },
      });

      if (!author) throw new UserNotFoundException(user.email);
      let fileUrl: UploadApiResponse;
      if (file !== null || file !== undefined) {
        const fileName = await this.fileUploadService.fileNameGenerator(file);
        fileUrl = await this.fileUploadService.fileUploader(fileName);
      }

      const post = this.postRepository.create({ ...createPostDto, author });
      post.file = fileUrl.url;

      await this.postRepository.save(post);
      post.author.access_token = null;
      return post;
    } catch (error) {
      throw error;
    }
  }

  async getPost(id: string): Promise<Post> {
    return this.postRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
  }

  async getPostByAuthor(id: string): Promise<Post> {
    return this.postRepository.findOne({ where: { author: { id } } });
  }

  async getPosts(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['comments'] });
  }

  async createComment(
    createCommenDto: CreateCommentDto,
    author: User,
    postId: string,
  ): Promise<Comment> {
    const post = await this.postRepository.findOne({ where: { id: postId } });

    const comment = this.commentRepository.create({
      ...createCommenDto,
      post,
      author,
    });

    return this.commentRepository.save(comment);
  }

  /* async uplaodPostFile(postId:string, file: Express.Multer.File){

    try {
      const post = await this.postRepository.findOne({ where: { id: postId } });

      if(!post) throw new NotFoundException('No Post matches the ')
    } catch (error) {
      
    }

  } */
}
