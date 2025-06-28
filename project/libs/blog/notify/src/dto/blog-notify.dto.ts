import { IsArray, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Post } from '@project/core';
import { BlogNotifyApiProperty } from 'src/blog-notify-module/blog-notify.constants';

export class BlogNotifyDTO {
  @ApiProperty(BlogNotifyApiProperty.SubscriberId)
  @IsEmail()
  public email!: string;

  @IsArray()
  public posts!: Post[];
}
