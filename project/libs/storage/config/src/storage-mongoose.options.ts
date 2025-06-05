import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { getMongoConnectionString } from '@project/helpers';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('application.db.user') as string,
          password: config.get<string>('application.db.password') as string,
          host: config.get<string>('application.db.host') as string,
          port: config.get<number>('application.db.port') as number,
          authDatabase: config.get<string>('application.db.authBase') as string,
          databaseName: config.get<string>('application.db.name') as string,
        })
      }
    },
    inject: [ConfigService]
  }
}
