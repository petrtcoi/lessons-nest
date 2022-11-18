import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { validate } from 'class-validator'
import { Model } from 'mongoose'
import { SupplierListDto } from './dto/supplierList.dto'
import { Supplier, SupplierDocument } from './schemas/supplier.schema';

@Injectable()
export class SupplierService {
    constructor(@InjectModel(Supplier.name) private supplierModel: Model<SupplierDocument>){}


    async getList(): Promise<SupplierListDto> {
        const suppliers = await this.supplierModel.find({}).lean()
        
        const result = new SupplierListDto(suppliers)
        const errors = await validate(result)
        if (errors.length > 0) throw new HttpException('Error with response format', HttpStatus.INTERNAL_SERVER_ERROR)
        return result
    }

}
