import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

export class ItemaccessoryDto {

    @ApiProperty({description: "id комнаты, где размещена комплектующая", type: String, example: '627d28d8168068533f70a145', required: true})
    @IsNotEmpty()
    @IsString()
    room: string
    
    @ApiProperty({description: "id типа комплектуюзие ProductAccessory в БД", type: String, example: '6272e49bfac56f19a9d25c82', required: true})
    @IsNotEmpty()
    @IsString()
    accessory: string

    @ApiProperty({description: 'Количество',  type: Number, example: '2', required: true})
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number
    
    @ApiProperty({description: 'Скидка на данную пощиции в БД',  type: Number, example: 'в цвет радиатора', required: true})
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    discount: number
    
    @ApiProperty({description: 'Комментарий к позиции',  type: String, example: '0', required: false})
    @IsOptional()
    @IsString()
    comment?: string

    constructor(data) {
        this.room = typeof(data.room) === 'object' ? data.room.toString() : data.room
        this.accessory = typeof(data.accessory) === 'object' ? data.accessory.toString() : data.accessory
        this.quantity  = data.quantity
        this.discount = data.discount
        this.comment  = data.comment ? data.comment : ''
    }
}