import { Module } from '@nestjs/common'
import { CredentialService } from './credential.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Credential, CredentialSchema } from './schemas/credential.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Credential.name, schema: CredentialSchema }])],
  providers: [CredentialService],
  exports: [CredentialService]
})

export class CredentialModule { }
