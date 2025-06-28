import Joi from 'joi';
import { registerAs } from '@nestjs/config'
import { DECIMAL_RADIX } from '@project/helpers';

const DEFAULT_RABBIT_PORT = 5672;

export interface NotifyConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    exchange: string;
    queue: string;
}

const validationSchema = Joi.object({
    host: Joi.string().hostname().required(),
    port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
    user: Joi.string().required(),
    password: Joi.string().required(),
    exchange: Joi.string().required(),
    queue: Joi.string().required()
});

function validateConfig(config: NotifyConfig): void {
  const { error } = validationSchema.validate(config, {abortEarly: true});
  if (error) {
    throw new Error(`[Rabbit config validation error]: ${error.message}`);
  }
}

function getConfig(): NotifyConfig {
  const config: NotifyConfig = {
      host: process.env.RABBIT_HOST as string,
      port: parseInt(process.env.RABBIT_PORT as string, DECIMAL_RADIX) ?? DEFAULT_RABBIT_PORT,
      user: process.env.RABBIT_USER as string,
      password: process.env.RABBIT_PASSWORD as string,
      queue: process.env.RABBIT_QUEUE as string,
      exchange: process.env.RABBIT_EXCHANGE as string
  }

  validateConfig(config);
  return config;
}

export default registerAs('rabbit', getConfig);
