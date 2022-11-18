import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'


@Schema({ timestamps: true, versionKey: false })
export class Currency {
    
    @Prop({ required: true })
    name: string
    @Prop({ required: true })
    rate: number
}

export type CurrencyDocument = Currency & Document
export const CurrencySchema = SchemaFactory.createForClass(Currency)
