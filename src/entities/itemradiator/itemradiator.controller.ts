import { Controller, Get, Param } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { ItemradiatorService } from './itemradiator.service'
import { ItemradiatorDto } from './dto/itemradiator.dto'


@ApiTags('ItemRadiator')
@Controller('itemradiator')
export class ItemradiatorController {
    constructor(private readonly itemradaitorService: ItemradiatorService) { }

    @ApiOperation({ summary: 'полученеи радиатора по его ID' })
    @ApiParam({ name: 'id', required: true, type: String })
    @ApiOkResponse({ status: 200, type: ItemradiatorDto })
    @Get('/:id')
    async get(@Param('id') id: string): Promise<ItemradiatorDto> {
        return this.itemradaitorService.get(id)
    }

}
