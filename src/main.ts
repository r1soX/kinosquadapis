import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configSerivce = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  const corsWhitelist = [
    'http://localhost:3000',
    'https://kinosquad.ru',
    'https://www.kinosquad.ru',
  ];

  app.enableCors({
    credentials: true,
    origin: corsWhitelist,
  });

  await app.listen(configSerivce.get('PORT'));
}
bootstrap();
