import { Module } from '@nestjs/common'
import { StockController } from './stock.controller'
import { StockService } from './stock.service'

import { MongooseModule } from '@nestjs/mongoose'
import { StockAllItem, StockAllItemSchema } from './schemas/stockAllItem.schema'
import { Supplier, SupplierSchema } from '../../entities/supplier/schemas/supplier.schema'
import { StockBrandItem, StockBrandItemSchema } from './schemas/stockBrandItem.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StockAllItem.name, schema: StockAllItemSchema },
      { name: StockBrandItem.name, schema: StockBrandItemSchema },
      { name: Supplier.name, schema: SupplierSchema }
    ])
  ],
  controllers: [StockController],
  providers: [StockService]
})
export class StockModule { }
