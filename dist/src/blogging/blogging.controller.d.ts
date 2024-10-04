/// <reference types="multer" />
import { BloggingService } from './blogging.service';
import { CreatePostDto, CreateCommentDto } from './dto/create-post.dto';
import { User } from '../user/entities/user.entity';
export declare class BloggingController {
    private readonly bloggingService;
    constructor(bloggingService: BloggingService);
    create(createPostDto: CreatePostDto, file: Express.Multer.File, author: {
        id: string;
        email: string;
    }): Promise<import("./entities/post.entity").Post>;
    getPosts(): Promise<import("./entities/post.entity").Post[]>;
    findOne(id: string): Promise<import("./entities/post.entity").Post>;
    findPostByAuthor(id: string): Promise<import("./entities/post.entity").Post>;
    createComment(postId: string, createCommenDto: CreateCommentDto, author: User): Promise<import("./entities/comment.entity").Comment>;
}
