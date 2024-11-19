import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PennifyConfigModule } from '../config/pennify-config.module';
import { PennifyConfigService } from '../config/pennify-config.service';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './app-config/app-config.module';
import { ProductsModule } from './products/products.module';

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
    AppConfigModule,
    ProductsModule,
  ],
  providers: [PennifyConfigService],
})
export class AppModule {}
