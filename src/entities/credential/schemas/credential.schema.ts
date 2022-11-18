import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from "mongoose"

@Schema({ timestamps: false, versionKey: false })
export class Credential {
    
    @Prop({ required: true })
    key: string
    
    @Prop({ required: true })
    value: string

}

export type CredentialDocument = Credential & Document
export const CredentialSchema = SchemaFactory.createForClass(Credential)