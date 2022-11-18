import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { validate } from 'class-validator'

import { Store, StoreDocument } from './schemas/store.schema'
import { StoreListDto } from './dto/storeList.dto'
import { StoreDto } from './dto/store.dto'

@Injectable()
export class StoreService {
    constructor(
        @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
    ) { }

    async getList(): Promise<StoreListDto> {
        const stores = await this.storeModel.find({}).populate('whatsappTemplates').lean()
        const result = new StoreListDto(stores)
        const errors = await (await Promise.all(result.storeList.map(async store => await validate(store)))).flat()
        if (errors.length > 0) throw new HttpException('Wrong response format', HttpStatus.INTERNAL_SERVER_ERROR)
        return result
    }

    async getDefault(): Promise<StoreDto> {
        const store = await this.storeModel.findOne({}).populate('whatsappTemplates').exec()
        if (!store) return null
        const result = new StoreDto(store)
        const errors = await validate(result)
        if (errors.length > 0) return null
        return result
    }

}
