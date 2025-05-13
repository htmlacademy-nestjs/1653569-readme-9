import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthenticationModule } from '@project/authentication';
import { BlogUserModule} from '@project/blog-user';
import { BlogPostModule} from '@project/blog-post';
import { BlogCommentModule} from '@project/blog-comment';
import { AccountConfigModule, getMongooseOptions } from '@project/account-config';

@Module({
  imports: [
    AuthenticationModule,
    BlogUserModule,
    BlogPostModule,
    BlogCommentModule,
    AccountConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions())
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
