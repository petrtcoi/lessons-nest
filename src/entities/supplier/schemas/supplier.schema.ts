import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'
import { Document } from 'mongoose'


@Schema({timestamps: false, versionKey: false})
export class Supplier {
    @Prop({required: true})
    code: string
    @Prop({required: true})
    name: string
}

export type SupplierDocument = Supplier & Document
export const SupplierSchema = SchemaFactory.createForClass(Supplier)