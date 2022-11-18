import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport';
import { CustomStrategy } from '../../shared/auth/custom.strategy';
import { GetTwilioMsgDto } from './dto/getTwilioMsg.dto'
import { TwilioService } from './twilio.service';
import { SendTwilioMsgResultDto } from './dto/sendTwilioMsgResult.dto';
import { SendTwilioMsgDto } from './dto/sendTwilioMsg.dto';

@ApiTags('Twilio')
@UseGuards(AuthGuard(CustomStrategy.key))
@Controller('twilio')
export class TwilioController {
    constructor(private readonly twilioService: TwilioService){}


    @ApiOperation({summary: 'Получение списка'})
    @ApiOkResponse({status: 200, type: GetTwilioMsgDto})
    @Get('/')
    async getList(): Promise<GetTwilioMsgDto> {
        return this.twilioService.getList()
    }


    @ApiOperation({summary: 'Отправка сообщения WhatsApp'})
    @ApiOkResponse({status: 200, type: SendTwilioMsgResultDto})
    @Post('/')
    async sendMsg(@Body() data: SendTwilioMsgDto): Promise<SendTwilioMsgResultDto> {
        return this.twilioService.sendMsg(data)
    }


}
