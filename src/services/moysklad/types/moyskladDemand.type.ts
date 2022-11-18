import { MoyskaldEnityWithMeta } from './moyskladMeta.type';

export type MoyskladPosition = {
  quantity: number;
  price: number;
  discount: number;
  vat: number;
  assortment: MoyskaldEnityWithMeta;
};

export type MoyskladDemand = {
  name: string;
  organization: MoyskaldEnityWithMeta;
  agent: MoyskaldEnityWithMeta;
  store: MoyskaldEnityWithMeta;
  state: MoyskaldEnityWithMeta;
  customerOrder: MoyskaldEnityWithMeta;
  positions: MoyskladPosition[];
};
