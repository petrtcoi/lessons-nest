import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { MoyskladOrderDto } from './dto/moyskladOrder.dto'
import { AuthGuard } from '@nestjs/passport'
import { CustomStrategy } from '../../shared/auth/custom.strategy'
import { OrderDto } from './dto/order.dto'
import { MoyskladService } from './moysklad.service'

@ApiTags("Мой Склад")
@UseGuards(AuthGuard(CustomStrategy.key))
@Controller('moysklad')
export class MoyskladController {
    constructor(private readonly moyskladService: MoyskladService) { }


    @ApiOperation({ summary: "Получение информации о заказе из сервиса Мой Склад" })
    @ApiParam({ name: "name", required: true, description: "название заказа", type: 'string' })
    @ApiOkResponse({ status: 200, type: MoyskladOrderDto })
    @Get('/order/:name')
    async getOrder(@Param('name') name: string): Promise<OrderDto> {
        return this.moyskladService.getOrder(name)
    }

}
