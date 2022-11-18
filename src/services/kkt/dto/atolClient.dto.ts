import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator"

export class AtolClientDto {

    @ApiProperty({description: "Email клиента для отпрваки почты", example: "mail@mail.ru"})
    @IsOptional()
    @IsEmail()
    email: string

    @ApiProperty({description: "Телефон клиента для отпрваки почты", example: "+79996843710"})
    @IsOptional()
    @IsString()
    @Length(12,12)
    phone: string
    
}
