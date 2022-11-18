import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class StockBrandItemDto {


    @ApiProperty({description: 'Код поставщика', example: 'mtk'})
    @IsNotEmpty()
    @IsString()
    supplierCode: string

    @ApiProperty({description: 'Оригинальная строка (как это обозначено у поставщика в Excel)', example: 'Радиатор 3050/25 N69 3/4 нр'})
    @IsNotEmpty()
    @IsString()
    originalTitle: string

    @ApiProperty({description: 'Комментарий, если был такой', example: '-'})
    @IsOptional()
    @IsString()
    comment?: string

    @ApiProperty({description: 'Тип модели радиатора', example: 'arbonia_colum'})
    @IsNotEmpty()
    @IsString()
    modelType: string

    @ApiProperty({description: 'Модель радиатора', example: '3057'})
    @IsNotEmpty()
    @IsString()
    model: string

    @ApiProperty({description: 'Число секций', example: '12'})
    @IsNotEmpty()
    @IsNumber()
    sections: number

    @ApiProperty({description: 'Количество на складе', example: '> 15'})
    @IsNotEmpty()
    @IsString()
    quantity: string

    @ApiProperty({description: 'Цвет радиатора', example: 'ral 9016'})
    @IsNotEmpty()
    @IsString()
    color: string

    @ApiProperty({description: 'Подключение радиатора', example: '№1270'})
    @IsNotEmpty()
    @IsString()
    connection: string

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
        this.originalTitle = data.originalTitle
        this.comment = data.comment || null
        this.modelType = data.modelType
        this.model = data.model
        this.color = data.color
        this.connection = data.connection
        this.sections = data.sections
        this.quantity = data.quantity
        this.createdAt = (data.createdAt as Date).toISOString()
        this.updatedAt = (data.updatedAt as Date).toISOString()
    }
}