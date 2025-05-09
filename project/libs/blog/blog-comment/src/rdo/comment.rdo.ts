import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { BlogCommentApiProperty } from '../blog-comment-module/blog-comment.property';

export class CommentRDO {
  @ApiProperty(BlogCommentApiProperty.Id)
  @Expose()
  public id?: string;

  @ApiProperty(BlogCommentApiProperty.Text)
  @Expose()
  public text!: string;

  @ApiProperty(BlogCommentApiProperty.UserId)
  @Expose()
  public userId!: string;

  @ApiProperty(BlogCommentApiProperty.PostId)
  @Expose()
  public postId!: string;

  @ApiProperty(BlogCommentApiProperty.CreateDate)
   @Expose()
  public createDate!: Date;
}
