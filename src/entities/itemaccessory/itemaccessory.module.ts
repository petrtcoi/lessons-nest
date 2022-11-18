import { Module } from '@nestjs/common'
import { ItemaccessoryController } from './itemaccessory.controller'
import { ItemaccessoryService } from './itemaccessory.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ItemAccessory, ItemAccessorySchema } from './schemas/itemAccessory.schema'
import { ProductModule } from '../product/product.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ItemAccessory.name, schema: ItemAccessorySchema }]),
    ProductModule
  ],
  controllers: [ItemaccessoryController],
  providers: [ItemaccessoryService]
})
export class ItemaccessoryModule { }
