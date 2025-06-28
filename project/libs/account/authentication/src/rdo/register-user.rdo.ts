import { Expose } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';
import { AuthUserApiProperty } from '../authentication-module/authentication.property';

export class RegisterUserRDO {
  @ApiProperty(AuthUserApiProperty.Name)
  @Expose()
  public name!: string;

  @ApiProperty(AuthUserApiProperty.Email)
  @Expose()
  public email!: string;

  @ApiProperty(AuthUserApiProperty.AvatarPath)
  @Expose()
  public avatar!: string;
}
