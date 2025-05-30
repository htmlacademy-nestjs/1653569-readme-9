import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AuthUser } from '@project/core';

@Schema({
  collection: 'accounts',
  timestamps: true,
})
export class BlogUserModel extends Document implements AuthUser {
  @Prop({ required: true })
  public name!: string;

  @Prop({ required: true, unique: true })
  public email!: string;

  @Prop({ required: false })
  public avatarPath!: string;

  @Prop({ required: true })
  public createdAt!: Date;

  @Prop({ required: false })
  public postCount!: number;

  @Prop({ required: false })
  public subscribers!: string[];

  @Prop({ required: true })
  public passwordHash!: string;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
