import { Module } from '@nestjs/common';
import { CredentialModule } from '../../entities/credential/credential.module'
import { KktController } from './kkt.controller';
import { KktService } from './kkt.service';
import { MoyskladModule } from '../moysklad/moysklad.module';

@Module({
  imports: [CredentialModule, MoyskladModule],
  controllers: [KktController],
  providers: [KktService]
})
export class KktModule {}
