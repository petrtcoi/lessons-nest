import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsOptional, IsString } from "class-validator"


export class UpdateUserDto {

    @ApiProperty({ description: 'Имя пользователя' })
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({description: 'Список email адресов клиента', example: ['vadim@yandex.ru', 'manager@mouselite.ru']})
    @IsOptional()
    @IsArray()
    @IsString({each: true})
    emails?: string[]
}