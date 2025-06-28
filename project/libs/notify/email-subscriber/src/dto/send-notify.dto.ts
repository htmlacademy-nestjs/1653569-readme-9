import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail } from 'class-validator';

import { Post } from '@project/core';
import { EmailSubscriberApiProperty } from '../email-subscriber-module/email-subscriber.constants';

export class SendNotifyDTO {
  @ApiProperty(EmailSubscriberApiProperty.Email)
  @IsEmail()
  public email!: string;

  @IsArray()
  public posts!: Post[]
}
