import { IsMongoId, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { BlogLikeMessage } from '../blog-like-module/blog-like.constants';
import { BlogLikeApiProperty } from '../blog-like-module/blog-like.property';

export class CreateLikeDTO {
  @IsMongoId({message: BlogLikeMessage.InvalidId})
  @ApiProperty(BlogLikeApiProperty.UserId)
  public userId!: string;

  @IsUUID()
  @ApiProperty(BlogLikeApiProperty.PostId)
  public postId!: string;
}
