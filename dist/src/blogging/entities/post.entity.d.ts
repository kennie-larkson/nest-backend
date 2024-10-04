import { User } from './../../user/entities/user.entity';
import { Comment } from './comment.entity';
export declare class Post {
    id: string;
    title: string;
    content: string;
    author: User;
    comments: Comment[];
    file: string;
    createdAt: Date;
    updatedAt: Date;
}
