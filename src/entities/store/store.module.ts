import { Module } from '@nestjs/common'
import { StoreController } from './store.controller'
import { StoreService } from './store.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Store, StoreSchema } from './schemas/store.schema'
import { WhatsappTemplate, WhatsappTemplateSchema } from '../../services/whatsapp/schemas/whatsappTemplate.schema'
import { WhatsappPhone, WhatsappPhoneSchema } from '../../services/whatsapp/schemas/whatsappPhone.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Store.name, schema: StoreSchema },
      { name: WhatsappTemplate.name, schema: WhatsappTemplateSchema },
      { name: WhatsappPhone.name, schema: WhatsappPhoneSchema }
    ])
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService]
})
export class StoreModule { }
