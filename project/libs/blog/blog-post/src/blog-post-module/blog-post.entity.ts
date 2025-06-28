import { Post, Entity, PostStatus, PostType, Tag, VideoPost, PhotoPost, LinkPost, QuotePost, TextPost } from '@project/core';
import { StorableEntity } from '@project/core';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public userId!: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public postedAt?: Date;
  public isReposted!: boolean;
  public repostedPostId?: string;
  public repostedUserId?: string;
  public commentCount!: number;
  public likeCount!: number;
  public tags!: Tag[];
  public type!: PostType;
  public status!: PostStatus;
  public video?: VideoPost;
  public photo?: PhotoPost;
  public link?: LinkPost;
  public quote?: QuotePost;
  public text?: TextPost;

  constructor(post?: Post) {
    super();
    this.populate(post);
  }

  public populate(post?: Post): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.userId = post.userId;
    this.createdAt = post.createdAt ?? new Date();
    this.updatedAt = post.updatedAt ?? new Date();
    this.postedAt = post.postedAt ?? new Date();
    this.type = post.type;
    this.status = post.status ?? PostStatus.Published;
    this.isReposted = post.isReposted ?? false;
    this.repostedUserId = post.repostedUserId ?? undefined;
    this.repostedPostId = post.repostedPostId ?? undefined;
    this.commentCount = post.commentCount ?? 0;
    this.likeCount = post.likeCount ?? 0;
    this.tags = post.tags ?? [];
    this.video = post.video  ?? undefined;
    this.photo = post.photo  ?? undefined;
    this.link = post.link  ?? undefined;
    this.quote = post.quote  ?? undefined;
    this.text = post.text  ?? undefined;
  }

  public toPOJO(): Post {
    return {
      id: this.id,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postedAt: this.postedAt,
      type: this.type,
      status: this.status,
      isReposted: this.isReposted,
      repostedUserId: this.repostedUserId,
      repostedPostId: this.repostedPostId,
      commentCount: this.commentCount,
      likeCount: this.likeCount,
      tags: this.tags,
      video: this.video,
      photo: this.photo,
      link: this.link,
      quote: this.quote,
      text: this.text
    };
  }
}
