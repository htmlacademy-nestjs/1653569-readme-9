import { StorableEntity, Entity, Comment } from '@project/core';

export class BlogCommentEntity extends Entity implements StorableEntity<Comment>  {
    public message!: string;
    public userId!: string;
    public postId!: string;
    public createdAt!: Date;
    public updatedAt!: Date;

    constructor(comment?: Comment) {
      super()
      this.populate(comment);
    }

    public populate(comment?: Comment): void {
      if (!comment) {
        return;
      }

      this.id = comment.id ?? undefined;
      this.message = comment.message;
      this.userId = comment.userId;
      this.postId = comment.postId ?? undefined;
      this.createdAt = comment.createdAt;
      this.updatedAt = comment.updatedAt;
    }

    public toPOJO() {
      return {
        id: this.id,
        message: this.message,
        userId: this.userId,
        postId: this.postId,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };
    }
  }
