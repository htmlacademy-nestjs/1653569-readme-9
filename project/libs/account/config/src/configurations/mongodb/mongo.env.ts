import { IsNumber, IsOptional, IsString, Max, Min, validateOrReject } from 'class-validator';

import { EnvValidationMessage } from './mongo.messages';
import { MongoPort } from './mongo.constants';

export class MongoConfiguration {
  @IsString({ message: EnvValidationMessage.DBNameRequired })
  public name!: string;

  @IsString({ message: EnvValidationMessage.DBHostRequired })
  public host!: string;

  @IsOptional()
  @Min(MongoPort.Min)
  @Max(MongoPort.Max)
  @IsNumber({}, { message: EnvValidationMessage.DBPortRequired })
  public port?: number = MongoPort.Default;

  @IsString({ message: EnvValidationMessage.DBUserRequired })
  public user!: string;

  @IsString({ message: EnvValidationMessage.DBPasswordRequired })
  public password!: string;

  @IsString({ message: EnvValidationMessage.DBBaseAuthRequired })
  public authBase!: string;

  public async validate(): Promise<void> {
    try {
      await validateOrReject(this);
    } catch (error) {
      console.log(error);
    }
  }
}
