import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CurrencyService } from './currency.service'
import { CurrencyDto } from './dto/currency.dto'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UpdateCurrencyDto } from './dto/updateCurrency.dto';
import { DefaultCurrency } from './enums/defaultCurrency.enum'

@ApiTags('Валюты')
@Controller('currency')
export class CurrencyController {
    constructor(private readonly currencyService: CurrencyService) { }

    @ApiOperation({summary: 'Получение валюты по свойству :name'})
    @ApiParam({name: "name", required: true, description: "Название валюты", type: 'string', enum: DefaultCurrency})
    @ApiResponse({status: 200, type: CurrencyDto})
    @Get('/:name')
    async get(@Param('name') name: DefaultCurrency): Promise<CurrencyDto> {
        return await this.currencyService.get(name)
    }


    @ApiOperation({summary: 'Получение валюты по свойству :name'})
    @ApiBody({type: UpdateCurrencyDto})
    @ApiResponse({status: 200, type: CurrencyDto})
    @Patch()
    async update(@Body() data: UpdateCurrencyDto): Promise<CurrencyDto> {
        return await this.currencyService.update(data)
    }


    @ApiOperation({summary: 'Обновление евро с сайта ЦБ'})
    @ApiResponse({status: 200, type: CurrencyDto})
    @Post()
    async updateEuro(): Promise<CurrencyDto> {
        return await this.currencyService.updateEuro()
    }




}
