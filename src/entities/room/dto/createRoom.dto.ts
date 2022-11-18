import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import mongoose from "mongoose"
import { RoomType } from "../enums/roomType.enum"


export class CreateRoomDto {

    @ApiProperty({ description: "Тип версии", enum: RoomType })
    @IsOptional()
    @IsEnum(RoomType)
    type?: RoomType

    @ApiProperty({ description: "Заголовок помещения", example: "Гостиная" })
    @IsOptional()
    @IsString()
    title?: string
    
    @ApiProperty({ description: "Площадь помещения в кв.м.", example: 10 })
    @IsOptional()
    @IsNumber()
    square?: number

    @ApiProperty({ description: "Расчетная требуемая мощность радиаторов на помещение", example: 1000 })
    @IsOptional()
    @IsNumber()
    powerCalculated?: number

    @ApiProperty({ description: "ID версии, к которому прикреплена комната", example: "62691bec78cd95c207fc9603", required: true, type: mongoose.Types.ObjectId })
    @IsNotEmpty()
    @IsMongoId()
    version: string


}