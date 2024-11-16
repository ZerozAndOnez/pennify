import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppConfig, AppConfigDocument } from '../schemas/app-config.schema';

@Injectable()
export class AppConfigService {
  constructor(
    @InjectModel(AppConfig.name)
    private appConfigModel: Model<AppConfigDocument>
  ) {}

  async get(): Promise<AppConfig> {
    const config = await this.appConfigModel
      .findOne({ type: 'app_config' })
      .lean();
    if (!config) {
      /**
       * Defaults just in case the config fails to load.
       * // TODO TODOLuxury, move defaults to common package and import here.
       */
      return {
        _id: null,
        type: 'app_config',
        refreshTokenDurationInMilliseconds: 28800000,
        maxAgeInMilliseconds: 604800000,
      };
    }
    return config;
  }
}
