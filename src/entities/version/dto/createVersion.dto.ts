import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator"
import mongoose from "mongoose"

export class CreateVersionDto {

    @ApiProperty({ description: "ID проекта, к которому прикреплена версия", example: "62691bec78cd95c207fc9603", required: true, type: mongoose.Types.ObjectId })
    @IsNotEmpty()
    @IsMongoId()
    projectId: string 
    
    @ApiProperty({ description: "Название версии", example: "Zehnder 2180", default: "Версия", required: false })
    @IsOptional()
    @IsString()
    title?: string 
}