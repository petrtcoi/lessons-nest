import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"


export class WhatsappPhoneDto {

    @ApiProperty({description: "Телефонный номер"})
    @IsString()
    @IsNotEmpty()
    phone: string

    constructor(data) {
        this.phone = data.text
    }
}