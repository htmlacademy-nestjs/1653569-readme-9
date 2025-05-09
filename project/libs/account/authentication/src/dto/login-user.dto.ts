import { ApiProperty } from "@nestjs/swagger";
import { AuthUserApiProperty } from "../authentication-module/authentication.property";

export class LoginUserDTO {
  @ApiProperty(AuthUserApiProperty.Email)
  public email!: string;

  @ApiProperty(AuthUserApiProperty.Password)
  public password!: string;
}
