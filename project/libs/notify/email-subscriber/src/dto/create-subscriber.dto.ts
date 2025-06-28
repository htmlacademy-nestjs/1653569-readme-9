import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { EmailSubscriberApiProperty, EmailSubscriberMessage } from '../email-subscriber-module/email-subscriber.constants';

export class CreateSubscriberDTO {
  @IsMongoId()
  @ApiProperty(EmailSubscriberApiProperty.SubscriberId)
  @IsNotEmpty({ message: EmailSubscriberMessage.UserIdIsEmpty })
  public id!: string;

  @ApiProperty(EmailSubscriberApiProperty.Email)
  @IsEmail({}, { message: EmailSubscriberMessage.EmailIsNotValid })
  public email!: string;

  @IsString()
  @ApiProperty(EmailSubscriberApiProperty.Name)
  @IsNotEmpty({ message: EmailSubscriberMessage.NameIsEmpty })
  public name!: string;
}
