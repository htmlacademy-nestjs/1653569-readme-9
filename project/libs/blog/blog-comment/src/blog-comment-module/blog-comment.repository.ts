import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@project/data-access';
import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentFactory } from './blog-comment.factory';

@Injectable()
export class BlogCommentRepository extends BaseMemoryRepository<BlogCommentEntity> {
  constructor(entityFactory: BlogCommentFactory) {
    super(entityFactory);
  }

  public async findComments(postId: string): Promise<BlogCommentEntity[]> {
    const entities = Array.from(this.entities.values());
    const filteredEntities = entities.filter((entity) => entity.postId === postId);
    return filteredEntities.map((entity) => this.entityFactory.create(entity));
  }
}
