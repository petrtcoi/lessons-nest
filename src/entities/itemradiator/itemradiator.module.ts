import { Module } from '@nestjs/common'
import { ItemradiatorController } from './itemradiator.controller'
import { ItemradiatorService } from './itemradiator.service'
import { MongooseModule } from '@nestjs/mongoose'
import { ItemRadiator, ItemRadiatorSchema } from './schemas/itemRadiator.schema'
import { ProductModule } from '../product/product.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ItemRadiator.name, schema: ItemRadiatorSchema }]),
    ProductModule
  ],
  controllers: [ItemradiatorController],
  providers: [ItemradiatorService]
})
export class ItemradiatorModule { }
