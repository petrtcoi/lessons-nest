import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"


export class WhatsappTemplateDto {

    @ApiProperty({description: "текст самого шаблона"})
    @IsString()
    @IsOptional()
    text: string

    constructor(data) {
        this.text = data.text
    }
}