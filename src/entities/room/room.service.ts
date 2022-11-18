import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { validate } from 'class-validator'
import { Model } from 'mongoose'
import { CreateRoomDto } from './dto/createRoom.dto'
import { RoomDto } from './dto/room.dto'
import { Room, RoomDocument } from './schemas/room.schema'

@Injectable()
export class RoomService {
    constructor(
        @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>
    ) { }

    async create(data: CreateRoomDto): Promise<RoomDto> {

        const room = new this.roomModel(data)
        await room.save()
        const result = new RoomDto(room)
        const errors = await validate(result)
        if (errors.length > 0) throw new HttpException('error with response', HttpStatus.INTERNAL_SERVER_ERROR)
        return result
    }

    async delete(id: string):Promise<void> {
        await this.roomModel.findOneAndDelete({_id: id})
        return
    }
}
