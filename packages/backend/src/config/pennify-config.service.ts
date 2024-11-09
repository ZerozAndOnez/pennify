import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Environment } from './configuration';

@Injectable()
export class PennifyConfigService implements Environment {
  constructor(private configService: ConfigService) {}

  get mongodbUri(): string {
    return String(this.configService.get<string>('mongodbUri'));
  }

  get nodeEnv(): string {
    return String(this.configService.get<string>('nodeEnv'));
  }

  get jwtSecret(): string {
    return String(this.configService.get<string>('jwtSecret'));
  }
}
