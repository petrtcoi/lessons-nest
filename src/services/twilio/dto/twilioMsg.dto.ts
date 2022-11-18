import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"
import { TwilioMsgStatus } from "../enums/twilioMsgStatus.enum"


export class TwilioMsgDto {

    @ApiProperty({description: 'Номер исходящего телефона', example: 'whatsapp:+12185161529' }) 
    @IsNotEmpty()
    @IsString()
    phoneFrom: string

    @ApiProperty({description: 'Номер входящего телефона', example: 'whatsapp:+12185161529' }) 
    @IsNotEmpty()
    @IsString()
    phoneTo: string

    @ApiProperty({description: 'Текст сообщения', example: 'Добрый день...' }) 
    @IsNotEmpty()
    @IsString()
    message: string

    @ApiProperty({description: 'Время отправки сообщения по Мск', example: '01.07.2022, 10:38:58' }) 
    @IsNotEmpty()
    @IsString()
    date: string

    @ApiProperty({description: 'Статус сообщения', enum: TwilioMsgStatus }) 
    @IsNotEmpty()
    @IsString()
    status: string

    constructor(data) {
        this.phoneFrom = data.phoneFrom || ' '
        this.phoneTo = data.phoneTo || ' '
        this.message = data.message || ' '
        this.date = data.date 
        this.status = data.status
    }
}