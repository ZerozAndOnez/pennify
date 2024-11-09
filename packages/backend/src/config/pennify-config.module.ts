import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PennifyConfigService } from './pennify-config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: `packages/backend/environments/environment.${
        process.env.NODE_ENV || 'development'
      }.env`,
    }),
  ],
  providers: [PennifyConfigService],
  exports: [PennifyConfigService],
})
export class PennifyConfigModule {}
