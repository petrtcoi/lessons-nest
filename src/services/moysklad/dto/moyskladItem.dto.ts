import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { AtolPaymentObject } from "../../kkt/enums/atolPaymentObject.enum"
import { MoyskladItemType } from "../enums/moyskladItemType.enum"


export class MoyskladItemDto {
    @ApiProperty({description: "ID Item в системе Мой Склад", example: 'd08cb91c-fa4a-11e9-0a80-069900094bbd'})
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({description: 'Тип продукта', enum: MoyskladItemType, example: 'product'})
    @IsNotEmpty()
    @IsEnum(MoyskladItemType)
    type: MoyskladItemType

    @ApiProperty({description: "Название Item в системе Мой Склад", example: '1015883 Узел \"Multiflex F\" ZB, прямой...'})
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({description: "Цена Item в системе Мой Склад", example: 20})
    @IsNotEmpty()
    @IsNumber()
    price: number

    @ApiProperty({description: "Количество товаров / услуг", example: 2})
    @IsNotEmpty()
    @IsNumber()
    quantity: number

    @ApiProperty({description: "Сколько уже едениц было отгружено", example: 0})
    @IsNotEmpty()
    @IsNumber()
    shipped: number

    @ApiProperty({description: "Предмет оплаты в ситеме Атол", enum: AtolPaymentObject})
    @IsNotEmpty()
    @IsEnum(AtolPaymentObject)
    paymentObject: AtolPaymentObject


    constructor(data) {
        this.id = data.id
        this.type = data.type
        this.name = data.name
        this.price = data.price
        this.quantity = data.quantity
        this.shipped = data.shipped
        this.paymentObject = data.paymentObject
    }
}