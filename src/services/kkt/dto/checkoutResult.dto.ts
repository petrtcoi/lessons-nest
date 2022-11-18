import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, IsObject, IsOptional, IsString, IsUrl, ValidateNested } from "class-validator"

export class DocsLinks {
    @ApiProperty({ description: 'ссылка на ПКО' })
    @IsOptional()
    @IsUrl()
    cashLink?: string

    @ApiProperty({ description: 'ссылка на бановский платеж' })
    @IsOptional()
    @IsUrl()
    bankLink?: string

    @ApiProperty({ description: 'ссылка на отгрузку' })
    @IsOptional()
    @IsUrl()
    demandLink?: string
}


class AtolSell {
    @ApiProperty({ description: 'ИД заказа в системе Мой Склад', example: '29837832' })
    @IsNotEmpty()
    @IsString()
    orderName: string

    @ApiProperty({ description: 'Данные о чеке' })
    @IsNotEmpty()
    @IsObject()
    receipt: any

    @ApiProperty({ description: 'Данные о покупателей' })
    @IsNotEmpty()
    @IsObject()
    client: any

    constructor(atol: any) {
        this.orderName = atol.orderName || 'ОШИБКА'
        this.receipt = atol.receipt || { status: 'ОШИБКА' }
        this.client = atol.client || { status: 'ОШИБКА' }
    }
}

export class CheckoutResultDto {

    @ApiProperty({ description: 'Возврат данных от Атол онлайн', type: AtolSell })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AtolSell)
    atol: AtolSell

    @ApiProperty({ description: 'Ссылки на созданные документы в Мой Склад', type: DocsLinks })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => DocsLinks)
    docsLinks?: DocsLinks

    constructor(atol: any, docsLinks) {
        this.atol = new AtolSell(atol)
        this.docsLinks = docsLinks
    }
}




