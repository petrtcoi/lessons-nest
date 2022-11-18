import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsOptional, IsString, ValidateNested } from "class-validator"
import { _ProjectCurrencyDto } from "./_projectCurrency.dto"


export class UpdateProjectDto {

    @ApiProperty({ description: "id проекта", example: "62691bec78cd95c207fc9603", type: String })
    @IsString()
    @IsOptional()
    id?: string

    @ApiProperty({ description: "id менеджера", example: "62691bec78cd95c207fc9603", type: String })
    @IsString()
    @IsOptional()
    manager?: string

    @ApiProperty({ description: "id магазина", example: "62691bec78cd95c207fc9603", type: String })
    @IsString()
    @IsOptional()
    store?: string

    @ApiProperty({ description: "Название проекта", example: "Расчет", type: String })
    @IsString()
    @IsOptional()
    title?: string

    @ApiProperty({ description: "Описание проекта", example: "", type: String })
    @IsString()
    @IsOptional()
    description?: string

    @ApiProperty({ description: 'Заданные в проекте валюты', example: { eur: 99.5, varmann: 85 }, type: _ProjectCurrencyDto })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => _ProjectCurrencyDto)
    currencies?: _ProjectCurrencyDto

}