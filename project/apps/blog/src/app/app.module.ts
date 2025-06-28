import { Module } from '@nestjs/common';

import { BlogConfigModule } from '@project/blog-config';
import { BlogPostModule } from '@project/blog-post'
import { BlogCommentModule } from '@project/blog-comment';
import { BlogTagModule } from '@project/blog-tag';
import { BlogLikeModule } from '@project/blog-like';
@Module({
  imports: [
    BlogConfigModule,
    BlogPostModule,
    BlogCommentModule,
    BlogTagModule,
    BlogLikeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
