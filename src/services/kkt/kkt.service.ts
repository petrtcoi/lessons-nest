import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { validate } from 'class-validator';

import { CredentialService } from '../../entities/credential/credential.service';

import { atolConfig } from '../../config/atol.conf';
import * as atolVars from './config/atolVars';

import { AtolReceiptType } from './enums/atolReceiptType.enum';
import { AtolPaymentType } from './enums/atolPaymentType.enum';
import { MoyskladService } from '../moysklad/moysklad.service';
import { CheckoutDto } from './dto/checkout.dto';
import { CheckoutResultDto } from './dto/checkoutResult.dto';
import { AtolDocument } from './classes/atolDoc';
import { AtolReceiptDto } from './dto/atolReceipt.dto';
import { AtolClientDto } from './dto/atolClient.dto';

@Injectable()
export class KktService {
  token: string;
  atolHttp: AxiosInstance;

  async checkout(data: CheckoutDto): Promise<CheckoutResultDto> {
    const { orderName, client, receipt } = data;
    this._validateReceipt(receipt);
    this._validateClient(client);

    const order = await this.moyskladService.getOrderInstance(orderName);
    const atolDoc = new AtolDocument(client, receipt);
    const errors = await validate(atolDoc);
    if (errors.length > 0)
      throw new HttpException(
        'error with atolDoc',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const atolResult = await atolDoc.generateAtolDoc(this.atolHttp);
    const docsLinks = await order.generateMoyskladDocs(receipt);

    const result = new CheckoutResultDto(atolResult.data, docsLinks);
    const errorsResult = await validate(result);
    if (errorsResult.length > 0)
      throw new HttpException(
        'Ошибка при подготовке ответа',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return result;
  }

  private _validateReceipt(receipt: AtolReceiptDto) {
    const cash = (
      receipt.payments.find((x) => x.type === AtolPaymentType.CASH) || {
        sum: 0,
      }
    ).sum;
    const bank = (
      receipt.payments.find((x) => x.type === AtolPaymentType.BANK) || {
        sum: 0,
      }
    ).sum;
    if (
      receipt.type === AtolReceiptType.PAYMENT_ONLY &&
      cash === 0 &&
      bank === 0
    ) {
      throw new HttpException(
        'Сумма прихода должна быть больше 0, если идет предоплата',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  private _validateClient(client: AtolClientDto) {
    if (!client.email && !client.phone) {
      throw new HttpException(
        'Нужно указать или телефон или email',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // CONSTRUCTOR
  constructor(
    private readonly credentialService: CredentialService,
    private readonly moyskladService: MoyskladService,
  ) {
    this.token = '';
    this.atolHttp = axios.create({
      baseURL: atolVars.baseUrl,
      validateStatus: () => true,
    });
    this.atolHttp.interceptors.request.use(async (config) => {
      const token = await this._getToken();
      return { ...config, headers: { ...config.headers, Token: token } };
    });
  }

  // PRIVATE METHODS
  private async _getToken(): Promise<string> {
    if (this.token !== '') return this.token;
    const doc = await this.credentialService.getAtolToken();
    this.token = doc.value || '';

    const tokenValidated = await this._validateToken();
    if (tokenValidated === true) return this.token;

    const result = await this.atolHttp.post('/getToken', {
      login: atolConfig.login,
      pass: atolConfig.password,
    });
    if (result.status !== 200)
      throw new HttpException(
        'cant get Atol Token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    this.token = result.data.token;
    this.credentialService.updateAtolToken(this.token);

    return this.token;
  }

  private async _validateToken(): Promise<boolean> {
    const doc = await this.atolHttp.get(
      `/${atolConfig.group_code}/report/${atolConfig.some_uuid}`,
    );
    return doc.status === 200;
  }
}
