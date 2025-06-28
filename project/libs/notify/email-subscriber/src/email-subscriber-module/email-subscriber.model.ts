
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Subscriber } from '@project/core';

@Schema({
  collection: 'email-subscribers',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class EmailSubscriberModel extends Document implements Subscriber {
  public override id?: string;

  @Prop({ required: true })
  public email!: string;

  @Prop({ required: true })
  public name!: string;

  @Prop({ required: false, default: [] })
  public subscriptions?: string[]

  @Prop({ required: false, default: new Date() })
  public lastEmailDate!: Date
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);

EmailSubscriberSchema.virtual('id').get(function() {
  return (this._id as string).toString();
});
