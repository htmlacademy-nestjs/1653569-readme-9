import { Module } from '@nestjs/common';

import { BlogTagModule } from '@project/blog-tag';

import { BlogPostRepository } from './blog-post.repository';
import { BlogPostController } from './blog-post.controller';
import { BlogPostFactory } from './blog-post.factory';
import { BlogPostService } from './blog-post.service';
import { BlogLikeModule } from '@project/blog-like';
import { BlogNotifyModule } from '@project/blog-notify';

@Module({
  imports: [BlogTagModule, BlogLikeModule, BlogNotifyModule],
  controllers: [BlogPostController],
  providers: [BlogPostService, BlogPostRepository, BlogPostFactory],
  exports: [BlogPostService],
})
export class BlogPostModule {}
