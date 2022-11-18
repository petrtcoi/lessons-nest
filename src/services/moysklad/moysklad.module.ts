import { Module } from '@nestjs/common'
import { MoyskladService } from './moysklad.service'
import { MoyskladController } from './moysklad.controller'
import { CredentialModule } from '../../entities/credential/credential.module'

@Module({
  imports: [CredentialModule],
  providers: [MoyskladService],
  controllers: [MoyskladController],
  exports: [MoyskladService]
})
export class MoyskladModule { }
