import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductAccessory, ProductAccessorySchema } from './schemas/productAccessory.schema';
import { ProductModel, ProductModelSchema } from './schemas/productModel.schema'
import { ProductColor, ProductColorSchema } from './schemas/productColor.schema'
import { ProductConnection, ProductConnectionSchema } from './schemas/productConnection.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: ProductModel.name, schema: ProductModelSchema},
      {name: ProductAccessory.name, schema: ProductAccessorySchema},
      {name: ProductColor.name, schema: ProductColorSchema},
      {name: ProductConnection.name, schema: ProductConnectionSchema}
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
