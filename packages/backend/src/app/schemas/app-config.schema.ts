import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AppConfigDocument = AppConfig & Document;

@Schema({ collection: 'configs' })
export class AppConfig {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id!: Types.ObjectId | null;

  @Prop({ type: String, required: true, unique: true })
  type!: string;

  @Prop({ required: true })
  maxAgeInMilliseconds!: number;

  @Prop({ required: true })
  refreshTokenDurationInMilliseconds!: number;

  @Prop({ required: true })
  extendSessionDialogDisplayPeriodInMilliseconds!: number;
}

export const AppConfigSchema = SchemaFactory.createForClass(AppConfig);
