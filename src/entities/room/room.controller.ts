import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { CustomStrategy } from '../../shared/auth/custom.strategy'
@ApiTags('Room')
@UseGuards(AuthGuard(CustomStrategy.key))
@Controller('room')
export class RoomController {

    

}
