import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'
import { Project } from '../../project/schemas/project.schema'
import { Product } from './product.class'


@Schema({ timestamps: true, versionKey: false })
export class ProductModel extends Product {

    @Prop({ required: false }) prefix?: string
    @Prop({ required: false }) colorGroup?: string
    @Prop({ required: false }) connectionGroup?: string

    @Prop({ required: true, min: 0 }) width: number
    @Prop({ required: true, min: 0 }) height: number

    @Prop({ required: false, min: 0 }) dt50?: number
    @Prop({ required: false, min: 0 }) dt60?: number
    @Prop({ required: false, min: 0 }) dt70?: number

    @Prop({ required: false, min: 0 }) lengthBase?: number
    @Prop({ required: false, min: 0 }) lengthSection?: number
    @Prop({ required: false, min: 0 }) priceSection?: number

    @Prop({ required: false, min: 0 }) sections?: number

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
    project?: Project

}


export type ProductModelDocument = ProductModel & Document
export const ProductModelSchema = SchemaFactory.createForClass(ProductModel)