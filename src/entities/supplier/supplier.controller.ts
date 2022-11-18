import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { CustomStrategy } from '../../shared/auth/custom.strategy'
import { SupplierService } from './supplier.service'
import { SupplierListDto } from './dto/supplierList.dto'



@ApiTags('Поставщики')
@UseGuards(AuthGuard(CustomStrategy.key))
@Controller('supplier')
export class SupplierController {
    constructor(private readonly supplierService: SupplierService) { }


    @ApiOperation({ summary: 'Получение списка поставщиков' })
    @ApiOkResponse({ status: 200, type: SupplierListDto })
    @Get('/')
    async get(): Promise<SupplierListDto> {
        return await this.supplierService.getList()
    }


}
