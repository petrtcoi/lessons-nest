import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"

export class SendTwilioMsgDto {

    @ApiProperty({description: 'Номер телефона получателя', example: '+79626843710'})
    @IsNotEmpty()
    @IsString()
    @Length(12,12)
    phoneTo: string

    @ApiProperty({description: 'Код магазина', example: 'kitchenlove'})
    @IsNotEmpty()
    @IsString()
    storeCode: string

    @ApiProperty({description: 'Текст сообщения', example: 'Hello...'})
    @IsNotEmpty()
    @IsString()
    message: string

}