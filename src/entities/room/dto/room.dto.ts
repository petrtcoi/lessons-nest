import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { RoomType } from "../enums/roomType.enum"


export class RoomDto {

    @ApiProperty({ description: 'ID помещения', example: "627d1431338ba111f1a05ee1" })
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({ description: "Тип версии", enum: RoomType })
    @IsNotEmpty()
    @IsEnum(RoomType)
    type: RoomType

    @ApiProperty({ description: "Заголовок помещения", example: "Гостиная" })
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty({ description: "Описание помещения", example: "", required: false })
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty({ description: "Площадь помещения в кв.м.", example: 10 })
    @IsNotEmpty()
    @IsNumber()
    square: number

    @ApiProperty({ description: "Расчетная требуемая мощность радиаторов на помещение", example: 1000 })
    @IsNotEmpty()
    @IsNumber()
    powerCalculated: number

    @ApiProperty({ description: "id версии, к которой относится комната", example: "62691bec78cd95c207fc9603", type: String })
    @IsString()
    @IsNotEmpty()
    version: string

    @ApiProperty({ description: 'createdAt toISOString', example: '2022-04-12T13:20:01.556Z' })
    @IsNotEmpty()
    @IsString()
    createdAt: string

    @ApiProperty({ description: 'updatedAt toISOString', example: '2022-04-12T13:20:01.556Z' })
    @IsNotEmpty()
    @IsString()
    updatedAt: string


    constructor(data) {
        this.id = data._id.toString()
        this.type = data.type
        this.title = data.title
        this.description = data.description || ''
        this.square = data.square
        this.powerCalculated = data.powerCalculated
        this.version = typeof (data.version) === 'object' ? data.version.toString() : data.version
        this.createdAt = (data.createdAt as Date).toISOString()
        this.updatedAt = (data.updatedAt as Date).toISOString()
    }
}
