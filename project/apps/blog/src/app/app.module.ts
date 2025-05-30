import { Module } from '@nestjs/common';

import { BlogPostModule } from '@project/blog-post';
import { BlogCommentModule } from '@project/blog-comment'
import { BlogTagModule } from '@project/blog-tag';
import { BlogLikeModule } from '@project/blog-like';

@Module({
  imports: [
    BlogPostModule,
    BlogCommentModule,
    BlogTagModule,
    BlogLikeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
