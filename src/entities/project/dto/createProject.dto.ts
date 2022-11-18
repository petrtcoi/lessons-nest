import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"


export class CreateProjectDto {

    @ApiProperty({description: "Название проекта", example: "234242423", type: String})
    @IsString()
    @IsNotEmpty()
    title: string

}