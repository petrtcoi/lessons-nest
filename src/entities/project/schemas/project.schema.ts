import {  Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose'
import { VersionDto } from '../../version/dto/version.dto'
import { Store } from "../../store/schemas/store.schema"
import { User } from "../../user/schemas/user.schema"


@Schema()
export class ProjectCurrency {
    @Prop({ required: true })
    eur: number
    @Prop({ required: true })
    varmann: number
}


@Schema({
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true },
    autoIndex: true
})
export class Project {

    @Prop({ required: true, type: String, unique: true})
    title: string

    @Prop({ required: false, type: String, default: "" })
    description: string

    @Prop({ required: false, type: String, default: "" })
    images?: string

    @Prop({ required: true, _id: false, type: ProjectCurrency })
    currencies: ProjectCurrency

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
    manager: User

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Store" })
    store: Store


    // VIRTUAL
    versions: VersionDto[]


}

export type ProjectDocument = Project & Document
export const ProjectSchema = SchemaFactory.createForClass(Project)

ProjectSchema.virtual('versions', {
    ref: 'Version',
    localField: '_id',
    foreignField: 'project',
})

