import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { ItemaccessoryService } from './itemaccessory.service'
import { CustomStrategy } from '../../shared/auth/custom.strategy'
import { ItemaccessoryDto } from './dto/itemaccessory.dto'

@ApiTags('ItemAccessory')
@UseGuards(AuthGuard(CustomStrategy.key))
@Controller('itemaccessory')
export class ItemaccessoryController {
    constructor(private readonly itemaccessoryService: ItemaccessoryService) { }

    @ApiOperation({ summary: 'Получение информауии о компелутющей по ID' })
    @ApiParam({ name: "id", required: true, description: "id комплеутующей в бд", type: 'string' })
    @ApiOkResponse({ status: 200, type: ItemaccessoryDto })
    @Get('/:id')
    async get(@Param('id') id: string): Promise<ItemaccessoryDto> {
        return await this.itemaccessoryService.get(id)
    }


}
