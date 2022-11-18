import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CredentialDocument, Credential } from './schemas/credential.schema';

@Injectable()
export class CredentialService {
  constructor(
    @InjectModel(Credential.name)
    private readonly credentialModel: Model<CredentialDocument>,
  ) {}

  async getMoyskladToken() {
    return await this.credentialModel.findOne({ key: 'moyskladToken' });
  }

  async getAtolToken() {
    return await this.credentialModel.findOne({ key: 'atolToken' });
  }
  async updateAtolToken(token: string) {
    await this.credentialModel.findOneAndUpdate(
      { key: 'atolToken' },
      { value: token },
      { upsert: true },
    );
  }
}
