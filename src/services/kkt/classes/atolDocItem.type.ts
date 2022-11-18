import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsPositive, IsString, Min, ValidateIf } from "class-validator"
import { AtolReceiptItemDto } from "../dto/atolReceiptItem.dto"
import { AtolPaymentMethod } from "../enums/atolPaymentMethos.enum"
import { AtolPaymentObject } from "../enums/atolPaymentObject.enum"

export class AtolDocItem {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    sum: number

    @IsNotEmpty()
    @IsEnum(AtolPaymentMethod)
    payment_method: AtolPaymentMethod


    @IsNotEmpty()
    @IsEnum(AtolPaymentObject)
    payment_object: AtolPaymentObject

    @IsNotEmpty()
    @IsObject()
    @ValidateIf(o => o.vat?.type === 'none')
    vat: { type: "none" }


    constructor(
        item: AtolReceiptItemDto
    ) {
        this.name = item.name
        this.price = item.price
        this.quantity = item.quantity
        this.sum = item.sum
        this.payment_method = item.payment_method
        this.payment_object = item.payment_object
        this.vat = { type: "none" }
    }
}