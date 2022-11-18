import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"


export class UpdateVersionDto {

    @ApiProperty({ description: "Название версии", example: "Zehnder 3-трубчатые", type: String })
    @IsString()
    @IsOptional()
    title?: string

    @ApiProperty({ description: "Описание версии", example: "", type: String })
    @IsString()
    @IsOptional()
    description?: string

    @ApiProperty({ description: "Изображения версии", example: "", type: String })
    @IsString()
    @IsOptional()
    images?: string

}