import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'

import { configuration } from './config/configuration'

import { AuthModule } from './shared/auth/auth.module'
import { StockModule } from './services/stock/stock.module'
import { WhatsappModule } from './services/whatsapp/whatsapp.module'
import { TwilioModule } from './services/twilio/twilio.module'
import { EmailModule } from './services/email/email.module'
import { MoyskladModule } from './services/moysklad/moysklad.module'
import { KktModule } from './services/kkt/kkt.module'

import { CredentialModule } from './entities/credential/credential.module'
import { CurrencyModule } from './entities/currency/currency.module'
import { SupplierModule } from './entities/supplier/supplier.module'
import { StoreModule } from './entities/store/store.module'
import { UserModule } from './entities/user/user.module'
import { ProjectModule } from './entities/project/project.module'
import { VersionModule } from './entities/version/version.module'
import { RoomModule } from './entities/room/room.module'
import { ItemaccessoryModule } from './entities/itemaccessory/itemaccessory.module'
import { ProductModule } from './entities/product/product.module'
import { ItemradiatorModule } from './entities/itemradiator/itemradiator.module'


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_URL,
        ssl: true,
        sslValidate: true,
        sslCA: 'src/config/CA.pem',
        autoIndex: false
      })
    }),
    CurrencyModule,
    UserModule,
    AuthModule,
    StockModule,
    SupplierModule,
    StoreModule,
    WhatsappModule,
    TwilioModule,
    EmailModule,
    CredentialModule,
    MoyskladModule,
    KktModule,
    ProjectModule,
    VersionModule,
    RoomModule,
    ItemaccessoryModule,
    ProductModule,
    ItemradiatorModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
