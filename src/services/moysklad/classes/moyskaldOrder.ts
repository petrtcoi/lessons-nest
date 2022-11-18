import { AxiosInstance } from 'axios'
import mongoose from "mongoose"

import { BASEURL, PAYMENT_IN_STATE, CASH_IN_STATE, STORE_META, DEMAND_STATE } from '../config/moyskaldVars'

import { AtolReceiptDto } from "../../kkt/dto/atolReceipt.dto"
import { MoyskladOrderDto } from "../dto/moyskladOrder.dto"
import { DocsLinks } from "../../kkt/dto/checkoutResult.dto"
import { AtolReceiptType } from '../../kkt/enums/atolReceiptType.enum'
import { MoyskladDemand, MoyskladPosition } from '../types/moyskladDemand.type'
import { HttpException, HttpStatus } from '@nestjs/common'
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'



interface IMoyskladOrder {
    generateMoyskladDocs(receipt: AtolReceiptDto): Promise<DocsLinks>
}


export class MoyskladOrder implements IMoyskladOrder {

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => MoyskladOrderDto)
    private order: MoyskladOrderDto

    @IsNotEmpty()
    private moyskladHttp: AxiosInstance

    constructor(order: MoyskladOrderDto, moyskladHttp: AxiosInstance) {
        this.order = order
        this.moyskladHttp = moyskladHttp
    }

    private async _isNameUniq({ object, name }: { object: string, name: string }): Promise<boolean> {
        const result = await this.moyskladHttp.get(`/entity/${object}?filter=name=${name}`)
        return result.data.rows.length === 0
    }
    private async _getUniqName(object: string, base: string, index: number): Promise<string> {
        const checkName = `${base}-${index}`
        const isUniq = await this._isNameUniq({ object: object, name: checkName })
        if (isUniq) return checkName
        if (index >= 9) return `${base}-${new mongoose.Types.ObjectId().toString()}`
        return await this._getUniqName(object, base, index + 1)
    }



    public async generateMoyskladDocs(receipt: AtolReceiptDto): Promise<DocsLinks> {

        let result: DocsLinks = { cashLink: '', bankLink: '', demandLink: '' }

        const cash = (receipt.payments.find(x => x.type === 0) || { sum: -1 }).sum
        const bank = (receipt.payments.find(x => x.type === 1) || { sum: -1 }).sum

        if (bank > 0) {
            const paymentInName = await this._getUniqName('paymentin', this.order.name, 1)
            const resultBank = await this.moyskladHttp.post('/entity/paymentin', {
                organization: this.order.organization,
                agent: this.order.agent,
                sum: bank * 100,
                name: paymentInName,
                state: PAYMENT_IN_STATE,
                operations: [
                    {
                        meta: {
                            href: `${BASEURL}/entity/customerorder/${this.order.id}`,
                            type: 'customerorder',
                            mediaType: 'application/json',
                        }
                    }
                ]
            })
            result['bankLink'] = 'ОШИБКА'
            if (resultBank.status === 200) result['bankLink'] = resultBank.data.meta.uuidHref || ''
        }


        if (cash > 0) {
            const cashInName = await this._getUniqName('cashin', this.order.name, 1)
            const resultCash = await this.moyskladHttp.post('/entity/cashin', {
                organization: this.order.organization,
                agent: this.order.agent,
                sum: cash * 100,
                name: cashInName,
                state: CASH_IN_STATE,
                operations: [
                    {
                        meta: {
                            href: `${BASEURL}/entity/customerorder/${this.order.id}`,
                            type: 'customerorder',
                            mediaType: 'application/json',
                        }
                    }
                ]
            })
            result['cashLink'] = 'ОШИБКА'
            if (resultCash.status === 200) result['cashLink'] = resultCash.data.meta.uuidHref || ''
        }



        if (receipt.type === AtolReceiptType.WITH_DELOVERY) {
            const positions: (MoyskladPosition | null)[] = receipt.items.map(item => {
                const orderItem = this.order.items.find(x => x.id === item.id)
                if (!orderItem) return null
                return {
                    price: orderItem.price * 100,
                    quantity: item.quantity,
                    discount: 0,
                    vat: 0,
                    assortment: {
                        meta: {
                            href: `${BASEURL}/entity/${orderItem.type}/${item.id}`,
                            type: orderItem.type,
                            mediaType: "application/json"
                        }
                    }

                }
            }).filter(Boolean) as unknown as MoyskladPosition[]

            if (positions.length !== receipt.items.length) {
                throw new HttpException('Указан не существующий в заказе товар ID', HttpStatus.INTERNAL_SERVER_ERROR)
            }

            const demandName = await this._getUniqName('demand', `a_${this.order.name}`, 1)
            const demand: MoyskladDemand = {
                name: demandName,
                organization: this.order.organization,
                agent: this.order.agent,
                store: STORE_META,
                customerOrder: {
                    meta: {
                        href: `${BASEURL}/entity/customerorder/${this.order.id}`,
                        type: 'customerorder',
                        mediaType: 'application/json',
                    }
                },
                state: DEMAND_STATE,
                positions: positions.filter(p => p?.quantity && p.quantity > 0)
            }

            const demandResult = await this.moyskladHttp.post('/entity/demand', demand)
            result['demandLink'] = 'ОШИБКА'
            if (demandResult.status === 200) result['demandLink'] = demandResult.data?.meta?.uuidHref || ''
        }

        return result
    }





}