import { Post } from './post.entity';
import { User } from './../../user/entities/user.entity';
export declare class Comment {
    id: string;
    content: string;
    author: User;
    post: Post;
    createdAt: Date;
}
