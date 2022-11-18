import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'
import { Document } from 'mongoose'


@Schema({ timestamps: true, versionKey: false })

export class StockBrandItem {

    @Prop({ required: true }) supplierCode: string
    @Prop({ required: true }) originalTitle: string
    @Prop({ required: false }) comment?: string
    @Prop({ required: true }) modelType: string
    @Prop({ required: true }) model: string
    @Prop({ required: true }) sections: number
    @Prop({ required: true }) quantity: string
    @Prop({ required: true }) color: string
    @Prop({ required: true }) connection: string
}

export type StockBrandItemDocument = StockBrandItem & Document
export const StockBrandItemSchema = SchemaFactory.createForClass(StockBrandItem)