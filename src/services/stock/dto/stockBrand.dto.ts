import { ApiProperty } from "@nestjs/swagger"
import {  IsNotEmpty, ValidateNested } from "class-validator"
import { Type } from 'class-transformer'
import { StockBrandItemDto } from "./stckBrandItem.dto"





export class StockBrandDto {
    @ApiProperty({description: 'Список товаров', type: [StockBrandItemDto]})
    @IsNotEmpty()
    @ValidateNested({each:true})
    @Type(() => StockBrandItemDto)
    items: StockBrandItemDto[]
    constructor(items){
        this.items = items.map(item => new StockBrandItemDto(item))
    }
}




