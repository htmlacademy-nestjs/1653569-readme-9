import { Module } from '@nestjs/common';

import { BlogPostModule } from '@project/blog-post';
import { BlogCommentModule } from '@project/blog-comment'
import { BlogTagModule } from '@project/blog-tag';

@Module({
  imports: [
    BlogPostModule,
    BlogCommentModule,
    BlogTagModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
