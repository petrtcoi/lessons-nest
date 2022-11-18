import { ApiProperty } from "@nestjs/swagger"
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator"


export class VersionDto {

    @ApiProperty({ description: "id версии", example: "62691bec78cd95c207fc9603", type: String })
    @IsString()
    @IsNotEmpty()
    id: string

    @ApiProperty({ description: "id проекта, к которому относится версия", example: "62691bec78cd95c207fc9603", type: String })
    @IsString()
    @IsNotEmpty()
    project: string


    @ApiProperty({ description: "Название версии", example: "Zehnder 3-трубчатые", type: String })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({ description: "Описание версии", example: "", type: String })
    @IsString()
    @IsOptional()
    description: string

    @ApiProperty({ description: "Изображения версии", example: "", type: String })
    @IsString()
    @IsOptional()
    images: string

    @ApiProperty({ description: 'createdAt toISOString', example: '2022-04-12T13:20:01.556Z' })
    @IsNotEmpty()
    @IsString()
    createdAt: string

    @ApiProperty({ description: 'updatedAt toISOString', example: '2022-04-12T13:20:01.556Z' })
    @IsNotEmpty()
    @IsString()
    updatedAt: string

    @ApiProperty({ description: 'Список ID помещений версии', type: [String] })
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    rooms: string[]


    constructor(data) {
        this.id = data._id.toString()
        this.project = typeof (data.project) === 'object' ? data.project.toString() : data.project
        this.title = data.title
        this.description = data.description || ''
        this.images = data.images || ''
        this.createdAt = (data.createdAt as Date).toISOString()
        this.updatedAt = (data.updatedAt as Date).toISOString()

        this.rooms = data.rooms.map(room => room.id)
    }

}