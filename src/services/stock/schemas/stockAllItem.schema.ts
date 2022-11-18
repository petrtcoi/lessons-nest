import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'
import { Document } from 'mongoose'


@Schema({timestamps: true})

export class StockAllItem {

    @Prop({ required: true })
    supplierCode: string

    @Prop({ required: true })
    sku: string

    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    quantity: string

    @Prop({ required: false })
    comment: string

}

export type StockAllItemDocument = StockAllItem & Document
export const StockAllItemSchema = SchemaFactory.createForClass(StockAllItem)