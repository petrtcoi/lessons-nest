import { ApiProperty } from "@nestjs/swagger"

export enum SendEmailResultDto {
    OK = 'ok',
    ERROR = 'error'
}

export class ResultEnum {
    @ApiProperty({enum: SendEmailResultDto})
    data: SendEmailResultDto
}