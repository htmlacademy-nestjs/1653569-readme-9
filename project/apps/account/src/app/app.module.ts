import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@project/authentication';
import { BlogUserModule} from '@project/blog-user';
import { BlogPostModule} from '@project/blog-post';
import { BlogCommentModule} from '@project/blog-comment';

@Module({
  imports: [AuthenticationModule, BlogUserModule, BlogPostModule, BlogCommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
