import { Post } from '../../blogging/entities/post.entity';
import { Comment } from '../../blogging/entities/comment.entity';
export declare class User {
    id: string;
    fname: string;
    lname: string;
    email: string;
    password: string;
    gender: string;
    role: string;
    access_token: string;
    profilePicture: string;
    posts: Post[];
    comments: Comment[];
    hashPassword(): Promise<void>;
}
