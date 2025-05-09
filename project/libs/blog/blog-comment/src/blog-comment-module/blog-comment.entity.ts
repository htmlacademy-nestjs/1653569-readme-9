import { StorableEntity, Entity, Comment } from '@project/core';

export class BlogCommentEntity extends Entity implements StorableEntity<Comment>  {
    public text!: string;
    public postId!: string;
    public userId!: string;
    public createdDate!: Date;

    constructor(comment: Comment) {
      super()
      this.populate(comment);
    }

    public populate(comment: Comment) {
      if (!comment) {
        return;
      }

      this.id = comment.id ?? ''
      this.text = comment.text;
      this.postId = comment.postId;
      this.userId = comment.userId;
      this.createdDate = comment.createdDate ?? new Date();
    }

    public toPOJO() {
      return {
        id: this.id,
        text: this.text,
        postId: this.postId,
        userId: this.userId,
        createdDate: this.createdDate,
      };
    }
  }
