import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdateCurrencyDto {
    @ApiProperty({ example: 'EURO', description: 'Название валюты' })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ example: '89', description: 'Курс валюты. Если указать значение < 0 (например,-1), то будет возвращать потом значения ЦБ' })
    @IsNotEmpty()
    @IsNumber()
    rate: number
}