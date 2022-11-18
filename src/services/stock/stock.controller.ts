import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger'
import { CustomStrategy } from '../../shared/auth/custom.strategy'
import { AuthGuard } from '@nestjs/passport'
import { StockAllDto } from './dto/stockAll.dto'
import { StockService } from './stock.service';
import { UpdateStockResultDto } from './dto/updateStockResult.dto';
import { UpdateStockDto } from './dto/updateStock.dto'
import { StockBrandDto } from './dto/stockBrand.dto'


@ApiTags('Складские остатки')
@UseGuards(AuthGuard(CustomStrategy.key))
@Controller('stock')
export class StockController {
    constructor(private readonly stockService: StockService){}

    @ApiOperation({ summary: 'Получить остатки по всем складам, сырые' })
    @ApiOkResponse({ status: 200, type: StockAllDto })
    @Get('/all')
    async getAllStockList(): Promise<StockAllDto> {
        return this.stockService.getAllList()
    }


    @ApiOperation({ summary: 'Обновляем сплошные остатки на складах' })
    @ApiBody({type: UpdateStockDto})
    @ApiOkResponse({ status: 200, type: UpdateStockResultDto })
    @Patch('/all')
    async updateAllStock(@Body() body: UpdateStockDto): Promise<UpdateStockResultDto> {
        return this.stockService.updateAll(body.items)
    }


    @ApiOperation({ summary: 'Получить остатки по всем складам, разбитые по типам' })
    @ApiOkResponse({ status: 200, type: StockAllDto })
    @Get('/branded')
    async getBrandStockList(): Promise<StockBrandDto> {
        return this.stockService.getBrandList()
    }

}



