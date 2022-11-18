import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { GetTwilioMsgDto } from './dto/getTwilioMsg.dto'
import twilioClient from './utils/twilioClient'
import { TwilioMsgDto } from './dto/twilioMsg.dto'
import { Length, validate } from 'class-validator'
import { SendTwilioMsgDto } from './dto/sendTwilioMsg.dto'
import { SendTwilioMsgResultDto } from './dto/sendTwilioMsgResult.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Store, StoreDocument } from '../../entities/store/schemas/store.schema'
import { Model } from 'mongoose'


const MSG_QNTY = 100


@Injectable()
export class TwilioService {
    constructor(
        @InjectModel(Store.name) private readonly storeModel: Model<StoreDocument>
    ) { }

    async getList(): Promise<GetTwilioMsgDto> {
        return await twilioClient.messages
            .list({ limit: MSG_QNTY })
            .then(async (data) => {
                const msgList: TwilioMsgDto[] = data.map(x => {
                    try {
                        return {
                            date: x.dateSent?.toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }),
                            phoneFrom: x.from,
                            phoneTo: x.to,
                            status: x.status,
                            message: x.body
                        }
                    }
                    catch {
                        return null
                    }
                }).filter(Boolean)

                const result = new GetTwilioMsgDto(msgList)
                const errors = await validate(result)
                if (errors.length > 0) throw new HttpException('Error in response format', HttpStatus.INTERNAL_SERVER_ERROR)
                return result
            })
    }



    async sendMsg(data: SendTwilioMsgDto): Promise<SendTwilioMsgResultDto> {
        const { phoneTo, storeCode, message } = data
        if (phoneTo[0] !== "+") throw new HttpException('Phone must be +79999999999', HttpStatus.BAD_REQUEST)

        const store = await this.storeModel.findOne({ code: storeCode }).populate('whatsappPhone').lean().exec()
        if (!store) throw new HttpException('cant find store', HttpStatus.BAD_REQUEST)
        if (!store.whatsappPhone?.phone) throw new HttpException('thiere is no whatsapp phone for this store', HttpStatus.BAD_REQUEST)

        const { sid } = await twilioClient.messages.create({
            body: message,
            from: `whatsapp:${store.whatsappPhone.phone}`,
            to: `whatsapp:${phoneTo}`
        })

        const result = new SendTwilioMsgResultDto(sid)
        const errors = await validate(result)
        if (errors.length > 0) throw new HttpException('seult format error', HttpStatus.INTERNAL_SERVER_ERROR)
        return { sid }

    }
}

