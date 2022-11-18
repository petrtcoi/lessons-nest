import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { validate } from 'class-validator'

import { ItemRadiator, ItemRadiatorDocument } from './schemas/itemRadiator.schema'
import { ItemradiatorDto } from './dto/itemradiator.dto'

@Injectable()
export class ItemradiatorService {
    constructor(@InjectModel(ItemRadiator.name) private itemradiatorModel: Model<ItemRadiatorDocument>) { }

    async get(id: string): Promise<ItemradiatorDto> {
        
        if (!mongoose.Types.ObjectId.isValid(id)) throw new HttpException('wring id format', HttpStatus.BAD_REQUEST)

        const item = await this.itemradiatorModel.findOne({ _id: id })
        if (!item) throw new HttpException('cant find doc', HttpStatus.NOT_FOUND)

        const result = new ItemradiatorDto(item)
        const errors = await validate(result)
        if (errors.length > 0) throw new HttpException('error with response format', HttpStatus.INTERNAL_SERVER_ERROR)

        return result
    }

}
