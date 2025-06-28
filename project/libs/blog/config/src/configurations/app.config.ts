import Joi from "joi";
import { registerAs } from "@nestjs/config";
import { DECIMAL_RADIX } from "@project/helpers";

const DEFAULT_PORT = 3002;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type Evironment = typeof ENVIRONMENTS[number];

export interface ApplicationConfig {
  environment: string;
  port: number;
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(DEFAULT_PORT),
})

function validateConfig(config: ApplicationConfig): void {
  const { error } = validationSchema.validate(config, {abortEarly: true});
  if (error) {
    throw new Error(`[Application Config validation error] ${error.message}`);
  }
}

function getConfig(): ApplicationConfig {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV as Evironment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, DECIMAL_RADIX)
  }

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
