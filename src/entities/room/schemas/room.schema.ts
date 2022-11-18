import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { RoomType } from '../enums/roomType.enum'
import mongoose, { Document, Model } from 'mongoose'
import { Version } from "../../version/schemas/version.schema"
import { ItemRadiator, ItemRadiatorSchema } from '../../itemradiator/schemas/itemRadiator.schema'
import { ItemAccessory, ItemAccessoryDocument } from '../../itemaccessory/schemas/itemAccessory.schema'
import { ItemAccessorySchema } from '../../itemaccessory/schemas/itemAccessory.schema'
import { Post } from '@nestjs/common'

const DEF_SQUARE = 10
const DEF_POWER_CALCULATED = 100 * DEF_SQUARE

@Schema({ timestamps: true, versionKey: false, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Room {

    @Prop({ required: true, enum: RoomType, default: RoomType.ZERO })
    type: RoomType

    @Prop({ required: true, default: "Помещение" })
    title: string

    @Prop({ required: false, default: '' })
    description: string

    @Prop({ required: true, default: DEF_SQUARE })
    square: number

    @Prop({ required: true, default: DEF_POWER_CALCULATED })
    powerCalculated: number

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Version' })
    version: Version

    // VIRTUAL
    // itemRadiators: (ItemRadiatorType & mongoose.Document)[]
    // itemAccessories: (ItemAccessoryType & mongoose.Document)[]

}

export type RoomDocument = Room & Document
export const RoomSchema = SchemaFactory.createForClass(Room)



