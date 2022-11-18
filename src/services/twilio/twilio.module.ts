import { Module } from '@nestjs/common'
import { TwilioController } from './twilio.controller'
import { TwilioService } from './twilio.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Store, StoreSchema } from '../../entities/store/schemas/store.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Store.name, schema: StoreSchema }
    ])
  ],
  controllers: [TwilioController],
  providers: [TwilioService]
})
export class TwilioModule { }
