import { ConfigType, registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';

import { MongoConfiguration } from './mongodb/mongo.env';
import { MongoPort } from './mongodb/mongo.constants';
import { DECIMAL_RADIX } from '@project/helpers';

async function getDbConfig(): Promise<MongoConfiguration> {
  const config = plainToClass(MongoConfiguration, {
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_DB,
    port: process.env.MONGO_PORT ? parseInt(process.env.MONGO_PORT, DECIMAL_RADIX) : MongoPort.Default,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE
  });

  await config.validate();
  return config;
}

export default registerAs('db', async (): Promise<ConfigType<typeof getDbConfig>> => getDbConfig());
