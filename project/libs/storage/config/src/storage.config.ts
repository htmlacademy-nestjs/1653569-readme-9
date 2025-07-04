import Joi from 'joi';
import { registerAs } from '@nestjs/config';
import { DECIMAL_RADIX } from '@project/helpers';

const DEFAULT_PORT = 3004;
const DEFAULT_UPLOAD_PATH = './uploads';
const DEFAULT_MONGO_PORT = 27017;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Environment = typeof ENVIRONMENTS[number];

export interface StorageConfig {
  environment: string;
  port: number;
  uploadDirectory: string;
  db: {
    host: string;
    port: number;
    user: string;
    name: string;
    password: string;
    authBase: string;
  }
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(DEFAULT_PORT),
  uploadDirectory: Joi.string().required(),
  db: Joi.object({
    host: Joi.string().valid().hostname(),
    port: Joi.number().port(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  })
});

function validateConfig(config: StorageConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Storage Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): StorageConfig {
  const config: StorageConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, DECIMAL_RADIX),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH || DEFAULT_UPLOAD_PATH,
    db: {
      host: process.env.MONGO_HOST as string,
      port: parseInt(process.env.MONGO_PORT ?? DEFAULT_MONGO_PORT.toString(), DECIMAL_RADIX),
      name: process.env.MONGO_DB as string,
      user: process.env.MONGO_USER as string,
      password: process.env.MONGO_PASSWORD as string,
      authBase: process.env.MONGO_AUTH_BASE as string,
    }
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
