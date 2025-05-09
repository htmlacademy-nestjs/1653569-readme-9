import { ClassTransformOptions, plainToInstance } from 'class-transformer';

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
