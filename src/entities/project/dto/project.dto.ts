import { Logger } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator"


import { VersionDto } from "../../version/dto/version.dto"
import { _ProjectCurrencyDto } from "./_projectCurrency.dto"



export class ProjectDto {

    @ApiProperty({ description: "id проекта", example: "62691bec78cd95c207fc9603", type: String })
    @IsString()
    @IsNotEmpty()
    id: string

    @ApiProperty({ description: "id менеджера", example: "62691bec78cd95c207fc9603", type: String })
    @IsString()
    @IsNotEmpty()
    manager: string

    @ApiProperty({ description: "id магазина", example: "62691bec78cd95c207fc9603", type: String })
    @IsString()
    @IsNotEmpty()
    store: string


    @ApiProperty({ description: "Название проекта", example: "Расчет", type: String })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({ description: "Описание проекта", example: "", type: String })
    @IsString()
    @IsOptional()
    description: string

    @ApiProperty({ description: 'Заданные в проекте валюты', example: { eur: 99.5, varmann: 85 } })
    @IsNotEmpty()
    @Type(() => _ProjectCurrencyDto)
    @ValidateNested({ each: true })
    currencies: _ProjectCurrencyDto


    @ApiProperty({ description: 'createdAt toISOString', example: '2022-04-12T13:20:01.556Z' })
    @IsNotEmpty()
    @IsString()
    createdAt: string

    @ApiProperty({ description: 'updatedAt toISOString', example: '2022-04-12T13:20:01.556Z' })
    @IsNotEmpty()
    @IsString()
    updatedAt: string


    @ApiProperty({ description: 'ID версий проекта', type: [String] })
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    versions: string[]


    constructor(data) {
        this.id = data._id.toString()
        this.manager = typeof (data.manager) === 'object' ? data.manager.toString() : data.manager
        this.store = typeof (data.store) === 'object' ? data.store.toString() : data.store
        this.title = data.title
        this.description = data.description || ""
        this.createdAt = (data.createdAt as Date).toISOString()
        this.updatedAt = (data.updatedAt as Date).toISOString()
        this.currencies = { eur: data.currencies.eur, varmann: data.currencies.varmann }
        this.versions = data.versions.map(version => version.id)
    }

}