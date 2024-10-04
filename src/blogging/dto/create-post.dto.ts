import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  /* @IsString()
  file: string; */
}

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}
