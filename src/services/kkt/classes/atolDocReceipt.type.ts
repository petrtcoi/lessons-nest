import { Type } from "class-transformer"
import { IsArray, IsNotEmpty, IsNumber, IsObject, Min, ValidateNested } from "class-validator"
import { mouseliteDoc } from "../../../config/atol.conf"
import { AtolClientDto } from "../dto/atolClient.dto"
import { AtolReceiptDto } from "../dto/atolReceipt.dto"
import { AtolDocItem } from "./atolDocItem.type"
import { AtolPayment } from "../types/atolPayment.type"

export class AtolDocReceipt {

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AtolClientDto)
    client: AtolClientDto

    @IsNotEmpty()
    @IsObject()
    company: typeof mouseliteDoc

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AtolDocItem)
    items: AtolDocItem[]

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AtolPayment)
    payments: AtolPayment[]

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    total: number

    constructor(
        client: AtolClientDto,
        receipt: AtolReceiptDto
    ) {
        this.client = client
        this.payments = receipt.payments
        this.total = receipt.total
        this.items = receipt.items.map(item => new AtolDocItem(item))
        this.company = mouseliteDoc
    }
}