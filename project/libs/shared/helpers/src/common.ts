import { ClassTransformOptions, plainToInstance, Transform } from 'class-transformer';
import { registerDecorator, ValidationOptions } from 'class-validator';
import { DECIMAL_RADIX } from './constants';
import { File, PaginationResult } from '@project/core';
interface mongoConnectionOptions {
  username: string;
  password: string;
  host: string;
  port: number;
  databaseName: string;
  authDatabase: string;
}

interface rabbitConnectionOptions {
  username: string;
  password: string;
  host: string;
  port: number;
}

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };

export function fillDTO<T, V>(
  DTOClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T;

export function fillDTO<T, V extends []>(
  DTOClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T[];

export function fillDTO<T, V>(
  DTOClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T | T[] {
  return plainToInstance(DTOClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}

export function getMongoConnectionString({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase
}: mongoConnectionOptions): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function getRabbitMQConnectionString({
  username,
  password,
  host,
  port
}: rabbitConnectionOptions): string {
  return `amqp://${username}:${password}@${host}:${port}`;
}

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] Bad time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, DECIMAL_RADIX);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit }
}

export function getAppPath(host: string, port: number) {
  return `http://${host}:${port}`;
}

export function ToLowerCase() {
  return Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v) => (typeof v === 'string' ? v.toLowerCase() : v));
    }
    return typeof value === 'string' ? value.toLowerCase() : value;
  });
}

export function IsYoutubeUrl(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isYoutubeUrl',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          const urlPattern =
            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
          return typeof value === 'string' && urlPattern.test(value);
        },
        defaultMessage() {
          return 'The text must be a valid YouTube URL';
        },
      },
    });
  };
}

export function calculateSkipItems(page: number, limit: number) {
  return page && limit ? (page - 1) * limit : undefined;
}

export function calculateItemsPerPage(totalCount: number, limit: number): number {
  return Math.ceil(totalCount / limit);
}

export function createPaginationResponse<T>(
  entities: T[],
  count: number,
  take: number,
  currentPage: number | undefined
): PaginationResult<T> {
  return {
    currentPage,
    totalPages: calculateItemsPerPage(count, take),
    itemsPerPage: take,
    totalItems: count,
    entities,
  };
}

export function createUploadURL(fileMetaData: File, host: string): string {
  const subDirectory = fileMetaData.subDirectory.replace('\\', '/');
  return `${host}/static/${subDirectory}/${fileMetaData.hashName}`
}
