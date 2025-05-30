import { BlogTagEntity, BlogTagFactory } from '@project/blog-tag';
import { BlogCommentEntity, BlogCommentFactory } from '@project/blog-comment';
import { Post, StorableEntity, Entity, PostState, PostType } from '@project/core';

export class BlogPostEntity extends Entity implements StorableEntity<Post> {
  public title?: string;
  public text?: string;
  public announcement?: string;
  public description?: string;
  public quoteText?: string;
  public quoteAuthor?: string;
  public linkPath?: string;
  public userId!: string;
  public isReposted!: boolean;
  public repostedPostId?: string;
  public repostedUserId?: string;
  public likeCount!: number;
  public commentCount!: number;
  public comments!: BlogCommentEntity[];
  public createdAt?: Date;
  public updatedAt?: Date;
  public state!: PostState;
  public type!: PostType;
  public tags!: BlogTagEntity[];

  constructor(post?: Post) {
    super()
    this.populate(post);
  }

  public populate(post?: Post): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.title = post.title;
    this.text = post.text;
    this.announcement = post.announcement;
    this.description = post.description;
    this.quoteText = post.quoteText;
    this.quoteAuthor = post.quoteAuthor;
    this.linkPath = post.linkPath;
    this.userId = post.userId;
    this.isReposted = post.isReposted ?? false;
    this.repostedPostId = post.repostedPostId;
    this.repostedUserId = post.repostedUserId;
    this.likeCount = post.likeCount ?? 0;
    this.commentCount = post.commentCount ?? 0;
    this.comments = [];
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.state = post.state ?? PostState.Published;
    this.type = post.type;
    this.tags = [];

    const blogCommentFactory = new BlogCommentFactory();
    for (const comment of post.comments) {
      const blogCommentEntity = blogCommentFactory.create(comment);
      this.comments.push(blogCommentEntity);
    }

    const blogTagFactory = new BlogTagFactory();
    for (const tag of post.tags) {
      const blogTagEntity = blogTagFactory.create(tag);
      this.tags.push(blogTagEntity);
    }
  }

  public toPOJO() {
    return {
      id: this.id,
      title: this.title,
      text: this.text,
      announcement: this.announcement,
      description: this.description,
      quoteText: this.quoteText,
      quoteAuthor: this.quoteAuthor,
      linkPath: this.linkPath,
      userId: this.userId,
      isReposted: this.isReposted,
      repostedPostId: this.repostedPostId,
      repostedUserId: this.repostedUserId,
      likeCount: this.likeCount,
      commentCount: this.commentCount,
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      state: this.state,
      type: this.type,
      tags: this.tags.map((tagEntity) => tagEntity.toPOJO()),
    };
  }
}
