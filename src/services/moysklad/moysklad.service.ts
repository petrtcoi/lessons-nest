import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { AxiosInstance } from 'axios'
import { CredentialService } from '../../entities/credential/credential.service'

import { OrderDto } from './dto/order.dto'

import { methodGetOrder } from './utils/methodGetOrder'
import { constructorSetHttp } from './utils/constructorSetHttp'
import { MoyskladOrder } from './classes/moyskaldOrder'
import { validate } from 'class-validator'

@Injectable()
export class MoyskladService {
    private moyskladHttp: AxiosInstance


    public async getOrder(orderName: string): Promise<OrderDto> {
        return await methodGetOrder(this.moyskladHttp, orderName)
    }

    public async getOrderInstance(orderName: string): Promise<MoyskladOrder> {
        const { order } = await this.getOrder(orderName)
        if (!order) throw new HttpException('cant create order instance', HttpStatus.INTERNAL_SERVER_ERROR)
        const result = new MoyskladOrder(order, this.moyskladHttp)
        const errors = await validate(result)
        if (errors.length > 0) throw new HttpException('cant get order instance', HttpStatus.INTERNAL_SERVER_ERROR)
        return result
    }


    constructor(private readonly credentialService: CredentialService) {
        this.moyskladHttp = constructorSetHttp(this.credentialService)
    }



}
