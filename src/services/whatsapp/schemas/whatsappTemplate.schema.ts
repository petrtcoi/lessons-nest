import { Prop, SchemaFactory } from '@nestjs/mongoose'
import { Document } from "mongoose"

export class WhatsappTemplate {
    @Prop({ required: true }) text: string
}

export type WhatsappTemplateDocument = WhatsappTemplate & Document
export const WhatsappTemplateSchema = SchemaFactory.createForClass(WhatsappTemplate)