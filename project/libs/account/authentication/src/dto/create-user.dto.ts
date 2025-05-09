import { ApiProperty } from "@nestjs/swagger";
import { AuthUserApiProperty } from "../authentication-module/authentication.property";

export class CreateUserDTO {
  @ApiProperty(AuthUserApiProperty.Name)
  public name!: string;

  @ApiProperty(AuthUserApiProperty.Email)
  public email!: string;

  @ApiProperty(AuthUserApiProperty.Password)
  public password!: string;

  @ApiProperty(AuthUserApiProperty.AvatarPath)
  public avatarPath!: string;
}
