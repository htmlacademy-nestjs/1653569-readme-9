import { StorableEntity, Entity, Like } from '@project/core';

export class BlogLikeEntity extends Entity implements StorableEntity<Like>  {
    public postId!: string;
    public userId!: string;

    constructor(data: Like) {
      super()
      this.populate(data);
    }

    public populate(data: Like) {
      if (!data) {
        return;
      }

      this.id = data.id ?? undefined
      this.postId = data.postId;
      this.userId = data.userId;
    }

    public toPOJO() {
      return {
        id: this.id,
        postId: this.postId,
        userId: this.userId,
      };
    }
  }
