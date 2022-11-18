import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator'
import { AtolPaymentType } from '../enums/atolPaymentType.enum'
export class AtolPayment {
    @ApiProperty({ description: 'Тип платежа', enum: AtolPaymentType })
    @IsNotEmpty()
    @IsEnum(AtolPaymentType)
    type: AtolPaymentType

    @ApiProperty({description: 'Сумма платежа'})
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    sum: number
}