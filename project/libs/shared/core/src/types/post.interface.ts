import { PostState } from './post-state.enum';
import { PostType } from './post-type.enum';
import { Tag } from './tag.interface';

export interface Post {
  id?: string;
  title?: string;
  text?: string;
  announcement?: string;
  description?: string;
  createdDate?: Date;
  publishDate?: Date;
  linkPath?: string;
  repostPostId?: string;
  repostUserId?: string;
  isReposted: boolean;
  likeCount?: number;
  commentCount?: number;
  userId: string;
  state?: PostState;
  type: PostType;
  tags?: Tag[];
}
