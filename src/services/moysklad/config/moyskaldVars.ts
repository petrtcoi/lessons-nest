import { MoyskaldEnityWithMeta } from '../types/moyskladMeta.type';

export const BASEURL = 'https://online.moysklad.ru/api/remap/1.2';

export const PAYMENT_IN_STATE: MoyskaldEnityWithMeta = {
  meta: {
    href: `${BASEURL}/entity/paymentin/metadata/states/50f37995-ddb2-11ec-0a80-0b15000bbe8c`,
    type: 'state',
    mediaType: 'application/json',
  },
};

export const CASH_IN_STATE: MoyskaldEnityWithMeta = {
  meta: {
    href: `${BASEURL}/entity/cashin/metadata/states/8b44618f-ddc1-11ec-0a80-01ef000e2c29`,
    type: 'state',
    mediaType: 'application/json',
  },
};

export const STORE_META: MoyskaldEnityWithMeta = {
  meta: {
    href: `${BASEURL}/entity/store/f9cf7dd7-c14e-11e5-7a69-8f5500000bf3`,
    type: 'store',
    mediaType: 'application/json',
  },
};

export const DEMAND_STATE: MoyskaldEnityWithMeta = {
  meta: {
    href: 'https://online.moysklad.ru/api/remap/1.2/entity/demand/metadata/states/1ff5cb38-e28a-11ec-0a80-0d4000125a67',
    type: 'state',
    mediaType: 'application/json',
  },
};
