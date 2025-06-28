import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostApiProperty } from '../blog-post-module/blog-post.property';

export class UpdatePhotoPostDTO {
  @IsOptional()
  @IsString()
  @ApiProperty(BlogPostApiProperty.Static)
  public path!: string;
}
