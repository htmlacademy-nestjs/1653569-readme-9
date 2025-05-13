import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsUrl, Length } from "class-validator";

import { AuthUserApiProperty } from "../authentication-module/authentication.property";
import { AuthUserValidateLength } from "../authentication-module/authentication.constants";

export class CreateUserDTO {
  @IsString()
  @Length(AuthUserValidateLength.Name.Min, AuthUserValidateLength.Name.Max)
  @ApiProperty(AuthUserApiProperty.Name)
  public name!: string;

  @IsEmail()
  @ApiProperty(AuthUserApiProperty.Email)
  public email!: string;

  @IsString()
  @Length(AuthUserValidateLength.Password.Min, AuthUserValidateLength.Password.Max)
  @ApiProperty(AuthUserApiProperty.Password)
  public password!: string;

  @IsUrl()
  @ApiProperty(AuthUserApiProperty.AvatarPath)
  public avatarPath!: string;
}
