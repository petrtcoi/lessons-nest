import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"


export class UpdateStockResultDto {
    @ApiProperty({description: 'Сколько товаров обновили', example: 120})
    @IsNumber()
    saved: number

    @ApiProperty({description: 'Сколько товаров удалили', example: 120})
    @IsNumber()
    removed: number

    @ApiProperty({description: 'Сколько товаров с ошибками', example: 120})
    @IsNumber()
    errors: number
}