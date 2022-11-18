import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'
import { ProductAccessory } from '../../product/schemas/productAccessory.schema'
import { Room } from "../../room/schemas/room.schema"

@Schema({ timestamps: false, versionKey: false })
export class ItemAccessory {
    static findOneAndDelete(arg0: { _id: any }) {
        throw new Error('Method not implemented.')
    }

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Room' })
    room: Room
    
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'ProductAccessory'})
    accessory: ProductAccessory

    @Prop({required: true, min: 0, default: 1}) 
    quantity: number
    
    @Prop({required: true, default: 0}) 
    discount: number
    
    @Prop({required: true, default: ''}) 
    comment: string
    
}


export type ItemAccessoryDocument = ItemAccessory & Document
export const ItemAccessorySchema = SchemaFactory.createForClass(ItemAccessory)