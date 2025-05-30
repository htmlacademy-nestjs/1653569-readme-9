import { Expose } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';
import { AuthUserApiProperty } from '../authentication-module/authentication.property';

export class UserRDO {
  @ApiProperty(AuthUserApiProperty.Id)
  @Expose()
  public id!: string;

  @ApiProperty(AuthUserApiProperty.Name)
  @Expose()
  public name!: string;

  @ApiProperty(AuthUserApiProperty.Email)
  @Expose()
  public email!: string;

  @ApiProperty(AuthUserApiProperty.AvatarPath)
  @Expose()
  public avatarPath!: string;

  @ApiProperty(AuthUserApiProperty.RegisterDate)
  @Expose({ name: 'createdAt' })
  public registerDate!: Date;

  @ApiProperty(AuthUserApiProperty.PostCount)
  @Expose()
  public postCount!: number;

  @ApiProperty(AuthUserApiProperty.Subscribers)
  @Expose()
  public subscribers!: string[]
}
