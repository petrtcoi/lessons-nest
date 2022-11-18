import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CheckoutDto } from './dto/checkout.dto'
import { CheckoutResultDto } from './dto/checkoutResult.dto'
import { KktService } from './kkt.service'

@ApiTags('Онлайн касса')
@Controller('kkt')
export class KktController {
    constructor(private readonly kktService: KktService) { }

    @ApiOperation({summary: 'Создание чека и сопутствующих документов в Мой Склад'})
    @ApiBody({type: CheckoutDto})
    @ApiOkResponse({status: 200, type: CheckoutResultDto})
    @Post('/checkout')
    async checkout(@Body() data: CheckoutDto): Promise<CheckoutResultDto> {
        return await this.kktService.checkout(data)
    }



}
