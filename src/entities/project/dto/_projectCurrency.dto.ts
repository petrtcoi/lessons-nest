import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsPositive, Min } from "class-validator"

export class _ProjectCurrencyDto {
    @ApiProperty({description: "Курс евро в проекте", example: 100})
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    eur: number

    @ApiProperty({description: "Курс варманн в проекте", example: 100})
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    varmann: number
}