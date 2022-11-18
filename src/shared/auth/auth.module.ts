import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../../entities/user/schemas/user.schema'

import { CustomStrategy } from './custom.strategy';
import { UserModule } from '../../entities/user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [],
  providers: [CustomStrategy]
})
export class AuthModule {}
