import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';
import { AuthUserApiProperty } from '../authentication-module/authentication.property';

export class SubscribeUserDTO {
  @IsString()
  @IsMongoId()
  @ApiProperty(AuthUserApiProperty.Id)
  public userId!: string;
}
