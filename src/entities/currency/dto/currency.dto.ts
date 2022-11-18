import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { DefaultCurrency } from '../enums/defaultCurrency.enum'
import { Currency, CurrencyDocument } from '../schemas/currency.schema'

export class CurrencyDto {
    @ApiProperty({example: 'EURO', description: 'Название валюты', enum: DefaultCurrency})
    @IsNotEmpty()
    @IsEnum(DefaultCurrency)
    @IsString()
    name: string

    @ApiProperty({example: '75.313', description: 'Курс валюты'})
    @IsNotEmpty()
    @IsNumber()
    rate: number

    constructor(data: CurrencyDocument | Currency) {
        this.name = data.name
        this.rate = data.rate
    }

}