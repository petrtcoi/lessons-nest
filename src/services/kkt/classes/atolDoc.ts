import { Type } from "class-transformer"
import { IsNotEmpty, IsObject, IsString, ValidateNested, ValidatePromise } from "class-validator"
import mongoose from "mongoose"

import { AtolClientDto } from "../dto/atolClient.dto"
import { AtolReceiptDto } from "../dto/atolReceipt.dto"
import { AtolDocReceipt } from "./atolDocReceipt.type"
import { AxiosInstance } from 'axios'
import { atolConfig } from "../../../config/atol.conf"
import { HttpException, HttpStatus } from "@nestjs/common"
import { AxiosResponse } from "axios"

const moment = require('moment-timezone')


interface IAtolDocument {
    generateAtolDoc(http: AxiosInstance): Promise<AxiosResponse>
}


export class AtolDocument implements IAtolDocument {

    @IsNotEmpty()
    @IsString()
    external_id: string

    @IsNotEmpty()
    @IsString()
    timestamp: string

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AtolDocReceipt)
    receipt: AtolDocReceipt



    constructor(
        client: AtolClientDto,
        receipt: AtolReceiptDto
    ) {
        this.external_id = new mongoose.Types.ObjectId().toString()
        this.timestamp = moment().tz('Europe/Moscow').format('DD.MM.YYYY HH:mm:ss')
        this.receipt = new AtolDocReceipt(client, receipt)
    }

    @ValidatePromise()
    public async generateAtolDoc(atolHttp: AxiosInstance): Promise<AxiosResponse> {

        const _atolDoc = {
            external_id: this.external_id,
            timestamp: this.timestamp,
            receipt: this.receipt
        }

        const atolResult = await atolHttp.post(`/${atolConfig.group_code}/sell`, _atolDoc, {
            headers: {"Content-type": "application/json; charset=utf-8"}
        })
        if (atolResult.status !== 200) throw new HttpException('cant create atol document', HttpStatus.INTERNAL_SERVER_ERROR)

        return atolResult
    }





}




