import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SendEmailDto } from './dto/sendEmail.dto'
import { SendEmailResultDto } from './dto/sendEmailResult.dto'

import sgMail from './sendGrid/sendGrid'

@Injectable()
export class EmailService {
    constructor() { }


    async sendEmail(data: SendEmailDto): Promise<SendEmailResultDto> {

        try {
            await sgMail.send(data)
            return SendEmailResultDto.OK
        } catch (err) {
            throw new HttpException('some error with send email', HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
}
