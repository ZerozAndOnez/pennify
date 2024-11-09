import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PennifyConfigModule } from '../config/pennify-config.module';
import { PennifyConfigService } from '../config/pennify-config.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [PennifyConfigModule],
      useFactory: async (pennifyConfigService: PennifyConfigService) => ({
        uri: pennifyConfigService.mongodbUri,
      }),
      inject: [PennifyConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PennifyConfigService],
})
export class AppModule {}
