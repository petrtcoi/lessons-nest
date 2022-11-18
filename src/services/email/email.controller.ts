import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SendEmailDto } from './dto/sendEmail.dto'
import { SendEmailResultDto } from './dto/sendEmailResult.dto'
import { EmailService } from './email.service'


@ApiTags('Отправка почты')
@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @ApiOperation({ summary: 'Отправка почты через сервис SendGrid' })
    @ApiBody({ type: SendEmailDto })
    @ApiResponse({ status: 200, description: `Отправка удалась, в ответе будет ${SendEmailResultDto.OK}` })
    @Post('/')
    async sendEmail(@Body() data: SendEmailDto): Promise<SendEmailResultDto> {
        return this.emailService.sendEmail(data)
    }

}
