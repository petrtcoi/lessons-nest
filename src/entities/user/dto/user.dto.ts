import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Role } from "../../../shared/enums/roles.enum"
import { UserDocument } from "../schemas/user.schema"

export class UserDto {
    @ApiProperty({ description: '_id Пользователя в базе' })
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({ example: 'Цой Петр', description: 'Полное имя пользователя' })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ example: ["petr@mouselite.ru", "sales@mouselite.ru"], description: 'массив email адресов клиента, доступных для авторизации' })
    @IsArray()
    @IsString({each: true})
    emails: string[]

    @ApiProperty({description: "Роли пользователя", enum: Role})
    @IsArray()
    @IsOptional()
    roles: Role[]

    constructor(data: UserDocument) {
        this.id = data.id
        this.name = data.name
        this.emails = data.emails
        this.roles = data.roles
    }
}