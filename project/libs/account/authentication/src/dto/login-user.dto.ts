import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

import { AuthUserApiProperty } from "../authentication-module/authentication.property";
import { AuthUserMessage, AuthUserValidateLength } from "../authentication-module/authentication.constants";

export class LoginUserDTO {
  @ApiProperty(AuthUserApiProperty.Email)
  @IsEmail({}, {message: AuthUserMessage.EmailNotValid})
  public email!: string;

  @IsString()
  @ApiProperty(AuthUserApiProperty.Password)
  @Length(AuthUserValidateLength.Password.Min, AuthUserValidateLength.Password.Max)
  public password!: string;
}
