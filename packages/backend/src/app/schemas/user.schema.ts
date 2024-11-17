import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export type SecureUser = Omit<User, 'password'>;

export type UserAuthenticated = SecureUser & {
  accessToken: string;
  refreshToken: string;
};

export type SecureUserClientEnd = Omit<UserAuthenticated, 'refreshToken'>;

@Schema()
export class User {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id!: Types.ObjectId;

  /**
   * TODOLuxury: Add as part of profile update
   */
  @Prop({ required: false, default: '' })
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
