import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { HttpClient } from './app.config';
import { UsersController } from './controllers/users.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { PostsController } from './controllers/posts.controller';
import { CommentsController } from './controllers/comments.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HttpClient.Timeout,
      maxRedirects: HttpClient.MaxRedirects,
    }),
  ],
  controllers: [UsersController, PostsController, CommentsController],
  providers: [CheckAuthGuard],
})
export class AppModule {}
