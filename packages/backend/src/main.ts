import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { PennifyConfigService } from './config/pennify-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(PennifyConfigService);

  app.use(cookieParser());

  app.enableCors({
    origin: configService.frontendUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
