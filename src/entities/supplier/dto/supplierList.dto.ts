import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, ValidateNested } from "class-validator"
import { SupplierDto } from "./supplier.dto"

export class SupplierListDto {

    @ApiProperty({description: 'Список поставщиков', type: [SupplierDto]})
    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(() => SupplierDto)
    supplierList: SupplierDto[]

    constructor(suppliers) {
        this.supplierList = suppliers.map(supplier => new SupplierDto(supplier))
    }

}