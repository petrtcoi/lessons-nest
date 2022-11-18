import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty } from "class-validator"

export class UpdateStockDto {
    @ApiProperty({description: 'Список товаров из Excel - без определенного формата', type: [Object]})
    @IsArray()
    @IsNotEmpty()
    items: any[]
}