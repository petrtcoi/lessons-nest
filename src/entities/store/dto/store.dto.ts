import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator"
import { WhatsappTemplateDto } from "../../../services/whatsapp/dto/whatsappTemplate.dto"
import { WhatsappTemplate } from '../../../services/whatsapp/schemas/whatsappTemplate.schema'

export class StoreDto {

    @ApiProperty({ description: 'ID магазина в базе', example: '62553ae5edacb8d9f4a870a4', required: true })
    @IsNotEmpty()
    @IsString()
    _id: string

    @ApiProperty({ description: 'Код магазина', example: 'zehnders', required: true })
    @IsNotEmpty()
    @IsString()
    code: string

    @ApiProperty({ description: 'Название магазина', example: 'Zehnders.ru', required: true })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ description: 'URL логотипа магазина', example: 'https://zehnders.ru/images/logo.png', required: true })
    @IsNotEmpty()
    @IsString()
    logoUrl: string

    @ApiProperty({ description: 'Телефонные номера магазина', example: '["(495) 055-40-12", "(812) 648-40-12"]', required: true })
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    phones: string[]


    @ApiProperty({ description: 'База URL для выдачи КП', example: 'cloud.zehnders.ru', required: false })
    @IsOptional()
    @IsString()
    offerUrlBase: string

    @ApiProperty({ description: 'Website магазина', example: 'zehnders.ru', required: false })
    @IsOptional()
    @IsString()
    website: string

    @ApiProperty({ description: 'Email магазина', example: 'mail@zehnders.ru', required: false })
    @IsOptional()
    @IsString()
    email: string

    @ApiProperty({ description: 'Whatsapp шаблоны магазина', type: [WhatsappTemplate], required: true })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => WhatsappTemplateDto)
    whatsappTemplates: WhatsappTemplateDto[]


    constructor(data) {
        this._id = typeof (data._id) === 'string' ? data._id : data._id.toString()
        this.code = data.code
        this.name = data.name
        this.logoUrl = data.logoUrl || ' '
        this.phones = data.phones || []
        this.offerUrlBase = data.offerUrlBase || ' '
        this.website = data.website || ' '
        this.email = data.email || ' '
        this.whatsappTemplates = data.whatsappTemplates ? data.whatsappTemplates.map(t => new WhatsappTemplateDto(t)).filter(x => x.text) : []
    }

}