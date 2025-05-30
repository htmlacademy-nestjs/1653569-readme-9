import { Module } from '@nestjs/common';

import { BlogLikeController } from './blog-like.controller';
import { BlogLikeService } from './blog-like.service';
import { BlogLikeRepository } from './blog-like.repository';
import { BlogLikeFactory } from './blog-like.factory';

@Module({
	controllers: [BlogLikeController],
	providers: [BlogLikeService, BlogLikeRepository, BlogLikeFactory],
	exports: [],
})
export class BlogLikeModule {}
