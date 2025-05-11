import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AuthUserApiProperty } from '../authentication-module/authentication.property';

export class LoggedUserRDO {
  @ApiProperty(AuthUserApiProperty.Id)
  @Expose()
  public id!: string;

  @ApiProperty(AuthUserApiProperty.Email)
  @Expose()
  public email!: string;

  @ApiProperty(AuthUserApiProperty.AccessToken)
  @Expose()
  public accessToken!: string;
}
