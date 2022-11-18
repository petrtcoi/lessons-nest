import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { MoyskladItemType } from "../../moysklad/enums/moyskladItemType.enum"
import { AtolPaymentMethod } from "../enums/atolPaymentMethos.enum"
import { AtolPaymentObject } from "../enums/atolPaymentObject.enum"

export class AtolReceiptItemDto {
    
    @ApiProperty({description: "ID Item в системе Мой Склад", example: 'd08cb91c-fa4a-11e9-0a80-069900094bbd'})
    @IsNotEmpty()
    @IsString()
    id: string

    @ApiProperty({description: "Название Item в системе Мой Склад", example: '1015883 Узел \"Multiflex F\" ZB, прямой...'})
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({description: 'Тип продукта', enum: MoyskladItemType, example: 'product'})
    @IsNotEmpty()
    @IsEnum(MoyskladItemType)
    type: MoyskladItemType
   
    @ApiProperty({description: "Цена Item в системе Мой Склад", example: 20})
    @IsNotEmpty()
    @IsNumber()
    price: number

    @ApiProperty({description: "Количество товаров / услуг", example: 2})
    @IsNotEmpty()
    @IsNumber()
    quantity: number

    @ApiProperty({description: "Итого стоимость товара", example: 40})
    @IsNotEmpty()
    @IsNumber()
    sum: number

    @ApiProperty({description: 'Метод оплаты', enum: AtolPaymentMethod})
    @IsNotEmpty()
    @IsEnum(AtolPaymentMethod)
    payment_method: AtolPaymentMethod

    @ApiProperty({description: "Предмет оплаты в ситеме Атол", enum: AtolPaymentObject})
    @IsNotEmpty()
    @IsEnum(AtolPaymentObject)
    payment_object: AtolPaymentObject
    
}