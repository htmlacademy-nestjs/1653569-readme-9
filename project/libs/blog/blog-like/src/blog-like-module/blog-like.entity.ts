import { StorableEntity, Entity, Like } from '@project/core';

export class BlogLikeEntity extends Entity implements StorableEntity<Like> {
  public postId!: string;
  public userId!: string;

  constructor(like: Like) {
    super()
    this.populate(like);
  }

  public populate(like: Like) {
    if (!like) {
      return;
    }

    this.postId = like.postId;
    this.userId = like.userId;
  }

  public toPOJO() {
    return {
      postId: this.postId,
      userId: this.userId,
    };
  }
}
