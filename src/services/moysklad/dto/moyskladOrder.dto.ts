import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { MoyskaldEnityWithMeta } from '../types/moyskladMeta.type';
import { MoyskladItemDto } from './moyskladItem.dto';

export class MoyskladOrderDto {
  @ApiProperty({
    description: 'ID заказа в системе Мой Склад',
    example: 'd08cb91c-fa4a-11e9-0a80-069900094bbd',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Название заказа в системе Мой Склад',
    example: 'test2',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Мета данные о покупателе в системе Мой Склад' })
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => MoyskaldEnityWithMeta)
  agent: MoyskaldEnityWithMeta;

  @ApiProperty({ description: 'Мета данные о продавце в системе Мой Склад' })
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => MoyskaldEnityWithMeta)
  organization: MoyskaldEnityWithMeta;

  @ApiProperty({ description: 'Общая сумма заказа', example: 50 })
  @IsNotEmpty()
  @IsNumber()
  sum: number;

  @ApiProperty({ description: 'Оплаченная сумма заказа', example: 20 })
  @IsNotEmpty()
  @IsNumber()
  payedSum: number;

  @ApiProperty({ description: 'Доставленная сумма заказа', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  shippedSum: number;

  @ApiProperty({ description: 'Состав заказа', type: [MoyskladItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MoyskladItemDto)
  items: MoyskladItemDto[];

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.agent = data.agent;
    this.organization = data.organization;
    this.sum = data.sum;
    this.payedSum = data.payedSum;
    this.shippedSum = data.shippedSum;
    this.items = data.items.map((item) => new MoyskladItemDto(item));
  }
}
