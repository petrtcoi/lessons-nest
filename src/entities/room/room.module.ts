import { Module } from '@nestjs/common'
import { RoomController } from './room.controller'
import { RoomService } from './room.service'
import { MongooseModule } from '@nestjs/mongoose'
import { RoomSchema, Room } from './schemas/room.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])
  ],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService]
})
export class RoomModule { }
