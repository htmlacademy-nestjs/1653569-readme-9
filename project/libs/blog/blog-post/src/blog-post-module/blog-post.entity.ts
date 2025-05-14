import { Post, StorableEntity, Entity, PostState, PostType, Tag } from '@project/core';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public title?: string;
  public text?: string;
  public announcement?: string;
  public linkPath?: string;
  public description?: string;
  public quote?: string;
  public createData?: Date;
  public publishDate?: Date;
  public isReposted!: boolean;
  public repostUserId?: string;
  public repostPostId?: string;
  public commentCount!: number;
  public likeCount!: number;
  public userId!: string;
  public state!: PostState;
  public type!: PostType;
  public tags?: Tag[];

  constructor(post: Post) {
    super()
    this.populate(post);
  }

  public populate(post?: Post): void {
    if (!post) {
      return;
    }

    this.id = post.id || ''
    this.title = post.title || '';
    this.text = post.text || '';
    this.announcement = post.announcement || '';
    this.linkPath = post.linkPath || '';
    this.description = post.description || '';
    this.quote = post.quote || '';
    this.createData = post.createdDate || new Date();
    this.publishDate = post.publishDate || new Date();
    this.isReposted = post.isReposted || false;
    this.repostUserId = post.repostUserId || '';
    this.repostPostId = post.repostPostId || '';
    this.commentCount = post.commentCount || 0;
    this.likeCount = post.likeCount || 0;
    this.userId = post.userId || '';
    this.state = post.state || PostState.Published;
    this.type = post.type;
    this.tags = post.tags ? post.tags.map(tag => tag) : [];
  }

  public toPOJO() {
    return {
      id: this.id,
      title: this.title,
      text: this.text,
      announcement: this.announcement,
      linkPath: this.linkPath,
      description: this.description,
      quote: this.quote,
      createDate: this.createData,
      publishDate: this.publishDate,
      isReposted: this.isReposted,
      repostUserId: this.repostUserId,
      repostPostId: this.repostPostId,
      commentCount: this.commentCount,
      likeCount: this.likeCount,
      userId: this.userId,
      state: this.state,
      type: this.type,
      tags: this.tags,
    };
  }
}
