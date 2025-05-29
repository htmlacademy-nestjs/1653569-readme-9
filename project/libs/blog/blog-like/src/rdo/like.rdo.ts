import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { BlogLikeApiProperty } from '../blog-like-module/blog-like.property';

export class LikeRDO {
  @ApiProperty(BlogLikeApiProperty.Id)
  @Expose()
  public id?: string;

  @ApiProperty(BlogLikeApiProperty.UserId)
  @Expose()
  public userId?: string;

  @ApiProperty(BlogLikeApiProperty.PostId)
  @Expose()
  public postId?: string;
}
