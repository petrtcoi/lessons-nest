import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsEnum, IsNotEmpty, IsNumber, ValidateNested } from "class-validator"
import { AtolPayment } from "../types/atolPayment.type"
import { AtolReceiptType } from '../enums/atolReceiptType.enum'
import { AtolReceiptItemDto } from "./atolReceiptItem.dto"

export class AtolReceiptDto {

    @ApiProperty({ description: "Товары, входящие в чек", type: [AtolReceiptItemDto] })
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => AtolPayment)
    items: AtolReceiptItemDto[]

    @ApiProperty({ description: "Разбивка суммы платежа по типам", type: [AtolPayment], example: [{ type: 0, sum: 12 }, { type: 1, sum: 3 }] })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AtolPayment)
    payments: AtolPayment[]

    @ApiProperty({ description: "Тип чека", enum: AtolReceiptType })
    @IsNotEmpty()
    @IsEnum(AtolReceiptType)
    type: AtolReceiptType

    @ApiProperty({ description: "Итого сумма чека", example: 14500 })
    @IsNotEmpty()
    @IsNumber()
    total: number

}