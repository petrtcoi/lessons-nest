import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Product } from './product.class'


@Schema({ timestamps: true, versionKey: false })
export class ProductColor extends Product {

    @Prop({ required: true, min: 0, default: 0 }) rateBase: number
    @Prop({ required: true, min: 0, default: 0 })rateConnection: number
    @Prop({ required: true, min: 0, default: 0 })priceBase: number
    @Prop({ required: true, min: 0, default: 0 })sort: number

}


export type ProductColorDocument = ProductColor & Document
export const ProductColorSchema = SchemaFactory.createForClass(ProductColor)