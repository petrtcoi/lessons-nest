import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'
import { Project } from '../../project/schemas/project.schema'
import { Product } from './product.class'


@Schema({ timestamps: true, versionKey: false })
export class ProductAccessory extends Product {

    @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
    project?: Project

}


export type ProductAccessoryDocument = ProductAccessory & Document
export const ProductAccessorySchema = SchemaFactory.createForClass(ProductAccessory)