import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Product } from './product.class'


@Schema({ timestamps: true, versionKey: false })
export class ProductConnection extends Product {

    @Prop({ required: true, min: 0, default: 0 }) priceBase: number
    @Prop({ required: true, min: 0, default: 0 }) sort: number

}


export type ProductConnectionDocument = ProductConnection & Document
export const ProductConnectionSchema = SchemaFactory.createForClass(ProductConnection)