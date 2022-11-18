import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Role } from '../../../shared/enums/roles.enum'


@Schema({ timestamps: false, versionKey: false })
export class User {

    @Prop({ required: true })
    name: string
    @Prop({ required: true })
    emails: string[]
    @Prop({ required: true })
    tokens: string[]
    @Prop({required: true})
    roles?: Role[]
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)