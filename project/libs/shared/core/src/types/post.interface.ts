import { LinkPost, PhotoPost, QuotePost, TextPost, VideoPost } from '../index';
import { PostType } from './post-type.enum';
import { PostStatus } from './post-status.enum';
import { Tag } from './tag.interface';

export interface Post {
  id?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  postedAt?: Date;
  isReposted: boolean;
  repostedUserId?: string;
  repostedPostId?: string;
  likeCount?: number;
  commentCount?: number;
  status: PostStatus;
  type: PostType;
  tags: Tag[];
  video?: VideoPost;
  photo?: PhotoPost;
  link?: LinkPost;
  quote?: QuotePost;
  text?: TextPost;
  videoId?: string;
  photoId?: string;
  linkId?: string;
  quoteId?: string;
  textId?: string;
  _count?: {
    comments: number;
    likes: number;
  }
}
