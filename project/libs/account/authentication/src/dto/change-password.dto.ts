import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { AuthUserValidateLength } from '../authentication-module/authentication.constants';
import { AuthUserApiProperty } from '../authentication-module/authentication.property';

export class ChangePasswordDTO {
  @IsString()
  @Length(AuthUserValidateLength.Password.Min, AuthUserValidateLength.Password.Max )
  @ApiProperty(AuthUserApiProperty.Password)
  public currentPassword!: string;

  @IsString()
  @Length(AuthUserValidateLength.Password.Min, AuthUserValidateLength.Password.Max )
  @ApiProperty(AuthUserApiProperty.Password)
  public newPassword!: string;
}
