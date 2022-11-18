import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsString } from "class-validator"
import { UserDocument } from "../schemas/user.schema"

export class UserListDto {
    @ApiProperty({ description: '_id Пользователя в базе' })
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({ name: 'Цой Петр', description: 'Полное имя пользователя' })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ example: ["petr@mouselite.ru", "sales@mouselite.ru"], description: 'массив email адресов клиента, доступных для авторизации' })
    @IsArray()
    @IsString({each: true})
    emails: string[]

    constructor(data: UserDocument) {
        this.id = data.id
        this.name = data.name
        this.emails = data.emails
    }
}