import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/models';
import { BlogTagModule } from '@project/blog-tag';
import { BlogCommentModule } from '@project/blog-comment';

import { BlogPostRepository } from './blog-post.repository';
import { BlogPostController } from './blog-post.controller';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostService } from './blog-post.service';

@Module({
  imports: [BlogTagModule, BlogCommentModule, PrismaClientModule],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository, BlogPostFactory],
  exports: [BlogPostService],
})
export class BlogPostModule {}
