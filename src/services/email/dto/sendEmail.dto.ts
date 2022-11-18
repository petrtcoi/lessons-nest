import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { FromEmailsEnum } from "../enums/fromEmails.enum"

export class SendEmailDto {

    @ApiProperty({description: 'От кого', example: 'mail@arboniashop.ru',  enum: FromEmailsEnum})
    @IsNotEmpty()
    @IsEnum(FromEmailsEnum)
    from: FromEmailsEnum

    @ApiProperty({description: 'Куда отправлять почту', example: 'mail@arboniashop.ru'})
    @IsNotEmpty()
    @IsEmail()
    to: string

    @ApiProperty({description: 'Скрытая копия', example: 'mail@arboniashop.ru', required: false})
    @IsOptional()
    @IsEmail()
    bcc: string

    @ApiProperty({description: 'Тема письма', example: 'Заказ оформлен'})
    @IsNotEmpty()
    @IsString()
    subject: string

    @ApiProperty({description: 'Текст письма', example: 'Добрый день'})
    @IsNotEmpty()
    @IsString()
    text: string

    @ApiProperty({description: 'HTML версия письма', example: '<h2>Добрый день</h2>'})
    @IsNotEmpty()
    @IsString()
    html: string

}