import { Post } from './post.interface';

export interface TextPost {
  id?: string;
  title: string;
  announcement: string;
  text: string;
  post?: Post;
}
