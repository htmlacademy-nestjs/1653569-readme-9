import { Injectable } from '@nestjs/common';

import { EntityFactory, Comment } from '@project/core';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDTO } from '../dto/create-comment.dto';

@Injectable()
export class BlogCommentFactory implements EntityFactory<BlogCommentEntity> {
  public create(entityPlainData: Comment): BlogCommentEntity {
    return new BlogCommentEntity(entityPlainData);
  }

  public createFromDTO(dto: CreateCommentDTO, postId: string): BlogCommentEntity {
    const currentDate = new Date();
    return new BlogCommentEntity({
      ...dto,
      postId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  }
}
