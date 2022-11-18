import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { validate } from 'class-validator'
import mongoose, { Model } from 'mongoose'

import { RoomService } from '../room/room.service'

import { CreateVersionDto } from './dto/createVersion.dto'
import { VersionDto } from './dto/version.dto'
import { Version, VersionDocument } from './schemas/version.schema'
import { ProjectDocument, Project } from '../project/schemas/project.schema'
import { Room, RoomDocument } from '../room/schemas/room.schema'

import { UpdateVersionDto } from './dto/updateVersion.dto'


@Injectable()
export class VersionService {
    constructor(
        @InjectModel(Version.name) private readonly versionModel: Model<VersionDocument>,
        @InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>,
        @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
        private readonly roomService: RoomService

    ) { }

    async getVersion(id: string): Promise<VersionDto> {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new HttpException('wrong id format', HttpStatus.BAD_REQUEST)
        const version = await this.versionModel.findOne({ _id: id }).populate('rooms', 'id')

        const result = new VersionDto(version)
        const errors = await validate(result)
        if (errors.length > 0) throw new HttpException('VersionDto error', HttpStatus.INTERNAL_SERVER_ERROR)
        return result
    }



    async create(data: CreateVersionDto): Promise<VersionDto> {
        const project = await this.projectModel.findOne({ _id: data.projectId })
        if (!project) throw new HttpException("cant find project", HttpStatus.BAD_REQUEST)

        const newVersion = new this.versionModel({ project: data.projectId, title: data.title })
        await newVersion.save()
        const defautRoom = await this.roomService.create({ version: newVersion.id })
        return new VersionDto({ ...newVersion.toObject(), rooms: [defautRoom] })
    }


    async update(id: string, updates: UpdateVersionDto): Promise<void> {
        await this.versionModel.findOneAndUpdate({ _id: id }, updates)
        return
    }


    async delete(versionId: mongoose.Types.ObjectId | string): Promise<void> {
        const rooms = await this.roomModel.find({ version: versionId })
        await Promise.all(rooms.map(room => this.roomService.delete(room._id)))
        await this.versionModel.findOneAndDelete({ _id: versionId })
        return
    }



}
