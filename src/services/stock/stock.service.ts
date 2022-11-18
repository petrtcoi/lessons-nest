import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { validate } from 'class-validator'

import { UpdateStockResultDto } from './dto/updateStockResult.dto'
import { StockAllDto } from './dto/stockAll.dto'
import { StockAllItem, StockAllItemDocument } from './schemas/stockAllItem.schema'
import { StockBrandItem, StockBrandItemDocument } from './schemas/stockBrandItem.schema'
import { Supplier, SupplierDocument } from '../../entities/supplier/schemas/supplier.schema';
import { StockBrandDto } from './dto/stockBrand.dto'

@Injectable()
export class StockService {
    constructor(
        @InjectModel(StockAllItem.name) private stockAllItemModel: Model<StockAllItemDocument>,
        @InjectModel(StockBrandItem.name) private stockBrandItemModel: Model<StockBrandItemDocument>,
        @InjectModel(Supplier.name) private supplierModel: Model<SupplierDocument>
    ) { }

    async getAllList(): Promise<StockAllDto> {
        const items = await this.stockAllItemModel.find({}).lean()
        const result = new StockAllDto(items)
        const errors = await validate(result)
        if (errors.length > 0) throw new HttpException('Error with result format', HttpStatus.INTERNAL_SERVER_ERROR)
        return result
    }


    async updateAll(items: any[]): Promise<UpdateStockResultDto> {

        let result: UpdateStockResultDto = {removed: 0, saved: 0, errors: 0}
        if (!items[0] || !items[0].supplierCode) throw new HttpException('No supplier code in items[0]', HttpStatus.BAD_REQUEST)
        const supplier = await this.supplierModel.findOne({code: items[0].supplierCode})
        if (!supplier) throw new HttpException('Wrong supplier code with item[0]', HttpStatus.BAD_REQUEST)

        result.removed = (await this.stockAllItemModel.deleteMany({supplierCode: supplier.code})).deletedCount
        await Promise.all(items.map(async (item: any) => {
            try {
                const newItem = new this.stockAllItemModel(item)
                await newItem.save()
                result.saved += 1
            } catch {
                result.errors += 1
            }
        }))
        return result
    }



    async getBrandList(): Promise<StockBrandDto> {
        const items = await this.stockBrandItemModel.find({}).lean()
        const result = new StockBrandDto(items)
        const errors = await validate(result)
        if (errors.length > 0) throw new HttpException('Error with result format', HttpStatus.INTERNAL_SERVER_ERROR)
        return result
    }
}
