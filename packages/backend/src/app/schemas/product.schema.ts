import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
  _id!: Types.ObjectId;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  category!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  image!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  stock!: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
