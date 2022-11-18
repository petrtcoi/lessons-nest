import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"


export class SupplierDto {

    @ApiProperty({description: 'Имя поставщика', example: 'ТА Мск'})
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({description: 'Код поставщика', example: 'hogart_spb'})
    @IsNotEmpty()
    @IsString()
    code: string

    constructor(data) {
        this.name = data.name
        this.code = data.code
    }

}