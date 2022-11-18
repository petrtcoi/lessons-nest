import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'

import { RoomDto } from '../../room/dto/room.dto'
import { Project } from '../../project/schemas/project.schema'



@Schema({ timestamps: true, versionKey: false, toJSON: { virtuals: true, getters: true }, toObject: { virtuals: true, getters: true } })
export class Version {

    @Prop({ required: true, type: String, default: "Версия" })
    title: string

    @Prop({ required: false, type: String, default: '' })
    description: string

    @Prop({ required: false, type: String, default: '' })
    images: string

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Project" })
    project: Project

    //VIRTUAL
    rooms: RoomDto[]

}

export type VersionDocument = Version & Document
export const VersionSchema = SchemaFactory.createForClass(Version)

VersionSchema.virtual('rooms', {
    ref: 'Room',
    foreignField: 'version',
    localField: '_id'
})


