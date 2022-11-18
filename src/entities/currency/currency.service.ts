import { Model } from 'mongoose'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Currency, CurrencyDocument } from './schemas/currency.schema'
import { CurrencyDto } from './dto/Currency.dto'
import { validate } from 'class-validator'
import { UpdateCurrencyDto } from './dto/updateCurrency.dto'
import { getEuroRate } from './utils/getEuroRate'
import { DefaultCurrency } from './enums/defaultCurrency.enum'
import { DefaultRates } from './enums/defayultRates.enum'

@Injectable()
export class CurrencyService {
    constructor(@InjectModel(Currency.name) private currencyModel: Model<CurrencyDocument>) { }

    async get(name: string): Promise<CurrencyDto> {
        const currency = await this.currencyModel.findOne({ name }).lean()
        if (!currency) {
            throw new HttpException('not found', HttpStatus.NOT_FOUND)
        }

        const result = new CurrencyDto(currency)
        const errors = await validate(result)
        if (errors.length) throw new HttpException('Error with result format', HttpStatus.INTERNAL_SERVER_ERROR)
        return result
    }



    async update(data: UpdateCurrencyDto): Promise<CurrencyDto> {
        const currency = await this.currencyModel.findOneAndUpdate({ name: data.name }, { rate: data.rate }, {returnDocument: 'after'})

        const result: CurrencyDto = new CurrencyDto(currency)
        const errors = await validate(result)
        if (errors.length > 0) throw new HttpException('Error with result format', HttpStatus.INTERNAL_SERVER_ERROR)
        return result
    }


    async updateEuro(): Promise<CurrencyDto> {

        const newRate = await getEuroRate()

        if (newRate === 0) throw new HttpException('cant get rate from CB', HttpStatus.INTERNAL_SERVER_ERROR)

        let currency = await this.currencyModel.findOne({ name: 'EURO' })
        if (!currency) throw new HttpException('cant get EURO from db', HttpStatus.INTERNAL_SERVER_ERROR)


        const rateDiff = (newRate - currency.rate) / currency.rate * 100
        if (rateDiff > 3 || rateDiff < 0) {
            currency.rate = newRate
            await currency.save()
        }

        const result = new CurrencyDto(currency)
        const errors = await validate(result)
        if (errors.length > 0) throw new HttpException('Error with result format', HttpStatus.INTERNAL_SERVER_ERROR)
        return result

    }


    async getDefaults(): Promise<{eur: number, varmann: number}> {
        const [euroDoc, varmannDoc] = await Promise.all([
            this.currencyModel.findOne({name: DefaultCurrency.DEFAULT_PROJECT_EURO}),
            this.currencyModel.findOne({name: DefaultCurrency.VARMANN})
        ])

        return {
            eur: euroDoc?.rate || DefaultRates.EUR,
            varmann: varmannDoc?.rate || DefaultRates.VARMANN
        }
    }

}
