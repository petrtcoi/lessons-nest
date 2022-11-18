import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class StockAllItemDto {

    @ApiProperty({description: 'Код поставщика', example: 'mtk'})
    @IsNotEmpty()
    @IsString()
    supplierCode: string

    @ApiProperty({description: 'Акртикул товара', example: 'W161 RAL9016'})
    @IsNotEmpty()
    @IsString()
    sku: string

    @ApiProperty({description: 'Наименование товара в базе', example: 'Радиатор K-Profil 11/500/1800 (18) BUDERUS'})
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty({description: 'Количество в том виде, как записано у поставщиков', example: '> 15'})
    @IsNotEmpty()
    @IsString()
    quantity: string

    @ApiProperty({description: 'createdAt toISOString', example: '2022-04-12T13:20:01.556Z'})
    @IsNotEmpty()
    @IsString()
    createdAt: string

    @ApiProperty({description: 'updatedAt toISOString', example: '2022-04-12T13:20:01.556Z'})
    @IsNotEmpty()
    @IsString()
    updatedAt: string

    constructor(data) {
        this.supplierCode = data.supplierCode
        this.sku = data.sku
        this.title = data.title
        this.quantity = data.quantity
        this.createdAt = (data.createdAt as Date).toISOString()
        this.updatedAt = (data.updatedAt as Date).toISOString()
    }
}