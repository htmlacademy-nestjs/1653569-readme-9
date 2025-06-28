import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMongoId } from "class-validator";
import { AccountApiProperty, AccountNotifyMessage } from "../account-notify-module/account-notify.constants";

export class CreateSubscriptionDTO {
  @IsEmail({}, { message: AccountNotifyMessage.EmailNotValid })
  @ApiProperty(AccountApiProperty.Email)
  email!: string;

  @IsMongoId()
  @ApiProperty(AccountApiProperty.Subscription)
  subscriptionId!: string;
}
