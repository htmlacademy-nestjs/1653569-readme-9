import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";

import { AuthUserApiProperty } from "../authentication-module/authentication.property";
import { AuthUserMessage, AuthUserValidateLength } from "../authentication-module/authentication.constants";

export class CreateUserDTO {
  @ApiProperty(AuthUserApiProperty.Name)
  @IsString()
  @Length(AuthUserValidateLength.Name.Min, AuthUserValidateLength.Name.Max)
  public name!: string;

  @ApiProperty(AuthUserApiProperty.Email)
  @IsEmail({}, {message: AuthUserMessage.EmailNotValid})
  public email!: string;

  @ApiProperty(AuthUserApiProperty.Password)
  @IsString()
  @Length(AuthUserValidateLength.Password.Min, AuthUserValidateLength.Password.Max)
  public password!: string;

  @ApiProperty(AuthUserApiProperty.AvatarPath)
  @IsOptional()
  public avatar!: string;
}
