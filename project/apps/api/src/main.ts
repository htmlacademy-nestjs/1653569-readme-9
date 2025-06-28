import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { RequestIdInterceptor } from '@project/interceptors';
import { AppModule } from './app/app.module';

const GLOBAL_PREFIX = 'api';
const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalInterceptors(new RequestIdInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Readme blog')
    .setDescription('The API Gateway service')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(PORT);
  Logger.log(`🚀 Application is running on: http://localhost:${PORT}/${GLOBAL_PREFIX}`);
}

bootstrap();
