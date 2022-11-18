import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose"

 export class WhatsappPhone {
    @Prop({required: true})
    phone: string
 }

 export type WhatsappPhoneDocument = WhatsappPhone & Document
 export const WhatsappPhoneSchema = SchemaFactory.createForClass(WhatsappPhone)