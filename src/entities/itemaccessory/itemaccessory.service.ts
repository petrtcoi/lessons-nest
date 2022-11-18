import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { validate } from 'class-validator'
import mongoose, { Model } from 'mongoose'
import { ItemaccessoryDto } from './dto/itemaccessory.dto'
import { ItemAccessory, ItemAccessoryDocument } from './schemas/itemAccessory.schema'

@Injectable()
export class ItemaccessoryService {
    constructor(@InjectModel(ItemAccessory.name) private itemaccessoryModel: Model<ItemAccessoryDocument>) { }



    async get(id: string): Promise<ItemaccessoryDto> {

        if (!mongoose.Types.ObjectId.isValid(id)) throw new HttpException('wrong id format', HttpStatus.BAD_REQUEST)

        const item = await this.itemaccessoryModel.findOne({ _id: id })
        if (!item) throw new HttpException('cant find doc', HttpStatus.NOT_FOUND)

        const result = new ItemaccessoryDto(item)
        const errors = await validate(result)
        if (errors.length > 0) throw new HttpException('error with response format', HttpStatus.INTERNAL_SERVER_ERROR)

        return result
    }

}
