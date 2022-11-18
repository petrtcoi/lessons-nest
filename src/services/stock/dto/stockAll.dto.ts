import { ApiProperty } from "@nestjs/swagger"
import {  IsNotEmpty, ValidateNested } from "class-validator"
import { Type } from 'class-transformer'
import { StockAllItemDto } from "./stckAllItem.dto"





export class StockAllDto {
    @ApiProperty({description: 'Список товаров', type: [StockAllItemDto]})
    @IsNotEmpty()
    @ValidateNested({each:true})
    @Type(() => StockAllItemDto)
    items: StockAllItemDto[]
    constructor(items){
        this.items = items.map(item => new StockAllItemDto(item))
    }
}




