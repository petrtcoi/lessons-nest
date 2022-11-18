import { Prop } from "@nestjs/mongoose"
import { ProductCurrency } from "../enums/productCurrency.enum"

export class Product {

    @Prop({ required: true, lowercase: true, trim: true, minlength: 1 })
    group: string

    @Prop({ required: true, lowercase: true, trim: true, minlength: 1 })
    code: string

    @Prop({ required: true, trim: true, minlength: 1 })
    title: string

    @Prop({ required: false, min: 0 })
    priceBase?: number

    @Prop({ required: false })
    deprecated?: boolean

    @Prop({ required: true, enum: ProductCurrency, trim: true, default: '' })
    currency?: string
}