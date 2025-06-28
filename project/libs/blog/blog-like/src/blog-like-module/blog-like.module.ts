import { Module } from '@nestjs/common';

import { BlogLikeService } from './blog-like.service';
import { BlogLikeRepository } from './blog-like.repository';
import { BlogLikeFactory } from './blog-like.factory';

@Module({
	providers: [BlogLikeService, BlogLikeRepository, BlogLikeFactory],
  exports: [BlogLikeService]
})
export class BlogLikeModule {}
