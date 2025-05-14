import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@project/data-access';
import { Nullable } from '@project/helpers';
import { BlogPostEntity } from './blog-post.entity';
import { BlogPostFactory } from './blog-post.factory';
import { UpdatePostDTO } from '../dto/update-post.dto';

@Injectable()
export class BlogPostRepository extends BaseMemoryRepository<BlogPostEntity> {
  constructor(entityFactory: BlogPostFactory) {
    super(entityFactory);
  }

  public async updatePost(id: string, dto: UpdatePostDTO): Promise<Nullable<BlogPostEntity>> {
    const entities = Array.from(this.entities.values());
    const post = entities.find((entity) => entity.id === id);
    if (!post) {
      return null;
    }

    const updatedPost = Object.assign(post, dto);
    return this.entityFactory.create(updatedPost);
  }

  public async findPosts() {
    const entities = Array.from(this.entities.values());
    return entities.map((entity) => this.entityFactory.create(entity));
  }

  public async findPostByTitle(title: string): Promise<Nullable<BlogPostEntity>> {
    const entities = Array.from(this.entities.values());
    const post = entities.find((entity) => entity && entity.title === title);
    if (!post) {
      return null;
    }

    return this.entityFactory.create(post);
  }
}
