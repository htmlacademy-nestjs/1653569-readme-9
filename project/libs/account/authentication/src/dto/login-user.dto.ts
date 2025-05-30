import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

import { AuthUserApiProperty } from "../authentication-module/authentication.property";
import { AuthUserMessage, AuthUserValidateLength } from "../authentication-module/authentication.constants";

export class LoginUserDTO {
  @IsEmail({}, {message: AuthUserMessage.EmailNotValid})
  @ApiProperty(AuthUserApiProperty.Email)
  public email!: string;

  @IsString()
  @Length(AuthUserValidateLength.Password.Min, AuthUserValidateLength.Password.Max)
  @ApiProperty(AuthUserApiProperty.Password)
  public password!: string;
}
