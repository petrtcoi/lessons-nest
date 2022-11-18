import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"

export class ItemradiatorDto {

    @ApiProperty({description: "id комнаты, где размещена комплектующая", type: String, example: '627d28d8168068533f70a145', required: true})
    @IsNotEmpty()
    @IsString()
    room: string
    
    @ApiProperty({description: "id типа модели ProductModel в БД", type: String, example: '6272e49bfac56f19a9d25c82', required: true})
    @IsNotEmpty()
    @IsString()
    model: string

    @ApiProperty({description: "id типа цвета ProductColoe в БД", type: String, example: '6272e49bfac56f19a9d25c82', required: false})
    @IsOptional()
    @IsString()
    color: string

    @ApiProperty({description: "id типа подключения ProductConnection в БД", type: String, example: '6272e49bfac56f19a9d25c82', required: false})
    @IsOptional()
    @IsString()
    connection: string

    @ApiProperty({description: 'Количество',  type: Number, example: '2', required: true})
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number
    
    @ApiProperty({description: 'Скидка на данную пощиции в БД',  type: Number, example: '0', required: true})
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    discount: number
    
    @ApiProperty({description: 'Комментарий к позиции',  type: String, example: 'под окном', required: false})
    @IsOptional()
    @IsString()
    comment?: string

    constructor(data) {
        this.room = typeof(data.room) === 'object' ? data.room.toString() : data.room
        this.model = typeof(data.model) === 'object' ? data.model.toString() : data.model
        this.color = typeof(data.color) === 'object' ? data.color.toString() : data.color
        this.connection = typeof(data.connection) === 'object' ? data.connection.toString() : data.connection
        this.quantity  = data.quantity
        this.discount = data.discount
        this.comment  = data.comment ? data.comment : ''
    }
}