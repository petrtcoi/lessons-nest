import { Module } from '@nestjs/common'
import { VersionController } from './version.controller'
import { VersionService } from './version.service'
import { MongooseModule } from '@nestjs/mongoose'

import { VersionSchema, Version } from './schemas/version.schema'
import { ProjectSchema, Project } from '../project/schemas/project.schema'
import { RoomModule } from '../room/room.module'
import { Room, RoomSchema } from '../room/schemas/room.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Version.name, schema: VersionSchema },
            { name: Project.name, schema: ProjectSchema },
            { name: Room.name, schema: RoomSchema }
        ]),
        RoomModule
    ],
    controllers: [VersionController],
    providers: [VersionService],
    exports: [
        VersionService
    ]
})
export class VersionModule { }
