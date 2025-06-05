import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { EmailSubscriberMessage } from '../email-subscriber-module/email-subscriber.constants';

export class CreateSubscriberDTO {
  @IsString()
  @IsNotEmpty({ message: EmailSubscriberMessage.UserIdIsEmpty })
  public id!: string;

  @IsEmail({}, { message: EmailSubscriberMessage.EmailIsNotValid })
  public email!: string;

  @IsString()
  @IsNotEmpty({ message: EmailSubscriberMessage.NameIsEmpty })
  public name!: string;
}
