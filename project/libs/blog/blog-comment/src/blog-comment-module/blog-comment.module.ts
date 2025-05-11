import { Module } from '@nestjs/common';

import { BlogCommentController } from './blog-comment.controller';
import { BlogCommentService } from './blog-comment.service';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentFactory } from './blog-comment.factory';

@Module({
	controllers: [BlogCommentController],
	providers: [BlogCommentService, BlogCommentRepository, BlogCommentFactory],
	exports: [],
})
export class BlogCommentModule {}
