import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId } from 'class-validator';
import { EmailSubscriberApiProperty, EmailSubscriberMessage } from '../email-subscriber-module/email-subscriber.constants';

export class CreateSubscriptionDTO {
  @ApiProperty(EmailSubscriberApiProperty.Email)
  @IsEmail({}, { message: EmailSubscriberMessage.EmailIsNotValid })
  email!: string;

  @ApiProperty(EmailSubscriberApiProperty.Subscription)
  @IsMongoId()
  subscriptionId!: string;
}
