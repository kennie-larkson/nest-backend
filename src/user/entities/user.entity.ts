import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserGender, Roles } from '../dto/create-user.dto';
import { Post } from '../../blogging/entities/post.entity';
import { Comment } from '../../blogging/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ enum: UserGender })
  gender: string;

  @Column({ enum: Roles, nullable: true })
  role: string;

  @Column()
  access_token: string;

  @Column({ nullable: true })
  profilePicture: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @BeforeInsert()
  async hashPassword() {
    try {
      if (this.password) {
        console.log('Hashing password: ', this.password);

        const hashed = (this.password = await bcrypt.hash(this.password, 10));
        console.log('Hashed: ', hashed);
      }
    } catch (error) {
      console.log('Hashing error: ', error);
    }
  }
}
