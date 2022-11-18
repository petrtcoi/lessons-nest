import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'
import { ProductColor } from '../../product/schemas/productColor.schema'
import { ProductConnection } from '../../product/schemas/productConnection.schema'
import { ProductModel } from '../../product/schemas/productModel.schema'
import { Room } from "../../room/schemas/room.schema"

@Schema({ timestamps: false, versionKey: false })
export class ItemRadiator {

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Room' })
    room: Room
    
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'ProductModel'})
    model: ProductModel

    @Prop({required: false, type: mongoose.Schema.Types.ObjectId, ref: 'ProductColor'})
    color?: ProductColor

    @Prop({required: false, type: mongoose.Schema.Types.ObjectId, ref: 'ProductConnection'})
    connection?: ProductConnection

    @Prop({required: true, min: 0, default: 1}) 
    quantity: number
    
    @Prop({required: true, default: 0}) 
    discount: number
    
    @Prop({required: true, default: ''}) 
    comment: string
    
}


export type ItemRadiatorDocument = ItemRadiator & Document
export const ItemRadiatorSchema = SchemaFactory.createForClass(ItemRadiator)