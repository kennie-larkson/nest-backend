/// <reference types="multer" />
import { CreatePostDto, CreateCommentDto } from './dto/create-post.dto';
import { User } from '../user/entities/user.entity';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { FileUploadService } from '../file-hosting/file-upload.service';
export declare class BloggingService {
    private postRepository;
    private commentRepository;
    private userRepository;
    private fileUploadService;
    constructor(postRepository: Repository<Post>, commentRepository: Repository<Comment>, userRepository: Repository<User>, fileUploadService: FileUploadService);
    createPost(createPostDto: CreatePostDto, user: {
        id: string;
        email: string;
    }, file: Express.Multer.File): Promise<Post>;
    getPost(id: string): Promise<Post>;
    getPostByAuthor(id: string): Promise<Post>;
    getPosts(): Promise<Post[]>;
    createComment(createCommenDto: CreateCommentDto, author: User, postId: string): Promise<Comment>;
}
