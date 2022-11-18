import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, ValidateNested } from "class-validator"
import { MoyskladOrderDto } from "./moyskladOrder.dto"

export class OrderDto {
    @ApiProperty({ description: "Информация о заказе из Мой Склад", type: MoyskladOrderDto })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => MoyskladOrderDto)
    order: MoyskladOrderDto

    constructor(order) {
        this.order = new MoyskladOrderDto(order)
    }
}