import { PostState } from './post-state.enum';
import { PostType } from './post-type.enum';
import { Comment } from './comment.interface';
import { Tag } from './tag.interface';

export interface Post {
  id?: string;
  title?: string;
  text?: string;
  announcement?: string;
  description?: string;
  quoteText?: string;
  quoteAuthor?: string;
  linkPath?: string;
  userId: string;
  isReposted: boolean;
  repostedPostId?: string;
  repostedUserId?: string;
  likeCount: number;
  commentCount: number;
  comments?: Comment[];
  createdAt?: Date;
  updatedAt?: Date;
  state?: PostState;
  type: PostType;
  tags?: Tag[];
}
