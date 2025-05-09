import { Module } from '@nestjs/common';

import { BlogPostRepository } from './blog-post.repository';
import { BlogPostController } from './blog-post.controller';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostService } from './blog-post.service';

@Module({
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository, BlogPostFactory],
  exports: [],
})
export class BlogPostModule {}
