import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AuthUserApiProperty } from '../authentication-module/authentication.property';

export class UpdateTokensRDO {
  @ApiProperty(AuthUserApiProperty.AccessToken)
  @Expose()
  public accessToken!: string;

  @ApiProperty(AuthUserApiProperty.RefreshToken)
  @Expose()
  public refreshToken!: string;
}
