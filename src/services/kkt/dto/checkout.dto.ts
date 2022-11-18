import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, IsString, ValidateNested } from "class-validator"
import { AtolClientDto } from './atolClient.dto';
import { AtolReceiptDto } from './atolReceipt.dto';

export class CheckoutDto {

    @ApiProperty({description: "Номер заказа", example: '3784674385'})
    @IsNotEmpty()
    @IsString()
    orderName: string

    @ApiProperty({description: 'Куда отправлять чек клиента', example: {email: 'mail@mail.ru'}, type: AtolClientDto})
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AtolClientDto)
    client: AtolClientDto

    @ApiProperty({description: 'Данные о чеке',type: AtolReceiptDto})
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AtolReceiptDto)
    receipt: AtolReceiptDto

}