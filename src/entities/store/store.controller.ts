import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { StoreService } from './store.service'
import { AuthGuard } from '@nestjs/passport';
import { CustomStrategy } from '../../shared/auth/custom.strategy'
import { StoreListDto } from './dto/storeList.dto'


@ApiTags('Магазины')
@UseGuards(AuthGuard(CustomStrategy.key))
@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService){}

    @ApiOperation({summary: 'Получить список магазинов с данными'})
    @ApiOkResponse({status: 200, type: StoreListDto})
    @Get('/')
    async getList(): Promise<StoreListDto> {
        return await this.storeService.getList()
    }

}
