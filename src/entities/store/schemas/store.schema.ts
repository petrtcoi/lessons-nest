import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from "mongoose"

import { WhatsappPhone } from "../../../services/whatsapp/schemas/whatsappPhone.schema"
import { WhatsappTemplate } from '../../../services/whatsapp/schemas/whatsappTemplate.schema';

@Schema({ timestamps: false, versionKey: false })
export class Store {

    @Prop({ required: true }) code: string
    @Prop({ required: true }) name: string
    @Prop({ required: true }) logoUrl: string
    @Prop({ required: false }) offerUrlBase: string
    @Prop({ required: false }) website: string
    @Prop({ required: false }) email: string
    @Prop({ required: true }) phones: string[]
    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'WhatsappPhone'
    })
    whatsappPhone: WhatsappPhone

    @Prop({
        required: true,
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WhatsappTemplate' }],
    })
    whatsappTemplates: WhatsappTemplate[]
}

export type StoreDocument = Store & Document
export const StoreSchema = SchemaFactory.createForClass(Store)

