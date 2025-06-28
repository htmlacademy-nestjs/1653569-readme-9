import { Post } from './post.interface';

export interface QuotePost {
  id?: string;
  text: string;
  author: string;
  post?: Post;
}
