import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AccountNotifyMessage } from '../account-notify-module/account-notify.constants';

export class CreateSubscriberDTO {
  @IsEmail({}, { message: AccountNotifyMessage.EmailNotValid })
  public email!: string;

  @IsString()
  @IsNotEmpty({ message: AccountNotifyMessage.NameIsEmpty })
  public name!: string;
}
