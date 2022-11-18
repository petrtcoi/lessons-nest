import { HttpException, HttpStatus } from "@nestjs/common"
import { validate } from "class-validator"
import { AtolPaymentObject } from "../../kkt/enums/atolPaymentObject.enum"
import { MoyskladItemDto } from "../dto/moyskladItem.dto"
import { OrderDto } from "../dto/order.dto"
import { AxiosInstance } from 'axios'

export const methodGetOrder = async (moyskladHttp: AxiosInstance, orderName: string): Promise<OrderDto> => {
    
    
    const moyskaldOrder = await moyskladHttp.get(`/entity/customerorder?filter=name=${orderName}`) || undefined
    if (!moyskaldOrder.data.rows || moyskaldOrder.data.rows.length === 0) throw new HttpException('cant get data from Moy sklad', HttpStatus.INTERNAL_SERVER_ERROR)

    const order = moyskaldOrder.data

    const name = order.rows[0].name as string
    const id = order.rows[0].id as string
    const sum = order.rows[0].sum / 100 as number
    const payedSum = order.rows[0].payedSum ? order.rows[0].payedSum / 100 : 0
    const shippedSum = order.rows[0].shippedSum ? order.rows[0].shippedSum / 100 : 0
    const agent = order.rows[0].agent
    const organization = order.rows[0].organization


    const positions: any = await moyskladHttp.get(order.rows[0].positions.meta.href)
    const productRows = positions.data.rows

    const items: MoyskladItemDto[] = await productRows.reduce(async (acc: MoyskladItemDto[], row: any) => {
        const data = await acc
        const res = await moyskladHttp.get(row.assortment.meta.href)
        const newItem: MoyskladItemDto = {
            id: res.data.id,
            type: res.data.meta.type,
            name: res.data.name,
            price: row.price / 100,
            quantity: row.quantity,
            shipped: row.shipped,
            paymentObject: res.data.paymentItemType === 'SERVICE' ? AtolPaymentObject.SERVICE : AtolPaymentObject.COMMODITY
        }
        return [...data, newItem]
    }, [])

    const orderResult = { id, name, agent, organization, sum, payedSum, shippedSum, items }

    const result = new OrderDto(orderResult)
    const errors = await validate(result)
    if (errors.length > 0) throw new HttpException('wrong order response formta', HttpStatus.INTERNAL_SERVER_ERROR)
    return result
}

