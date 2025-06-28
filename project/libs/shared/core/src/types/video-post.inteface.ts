import { Post } from "./post.interface";

export interface VideoPost {
  id?: string;
  title: string;
  url: string;
  post?: Post;
}
