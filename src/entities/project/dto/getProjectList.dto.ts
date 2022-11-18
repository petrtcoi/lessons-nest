import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator"

export class GetProjectListDto {
    @ApiProperty({description: "сколько нужно забрать проектов", type: Number, default: 200})
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    limit: number = 200
}