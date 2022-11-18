import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProjectService } from './project.service'
import { ProjectController } from './project.controller'
import { ProjectSchema, Project } from './schemas/project.schema'

import { VersionModule } from '../version/version.module'
import { StoreModule } from '../store/store.module'
import { CurrencyModule } from '../currency/currency.module'
import { User, UserSchema } from '../user/schemas/user.schema'
import { Store, StoreSchema } from '../store/schemas/store.schema'


@Module({
  imports: [
    VersionModule,
    StoreModule,
    CurrencyModule,
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: User.name, schema: UserSchema },
      { name: Store.name, schema: StoreSchema }
    ]),
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService]
})
export class ProjectModule { }
