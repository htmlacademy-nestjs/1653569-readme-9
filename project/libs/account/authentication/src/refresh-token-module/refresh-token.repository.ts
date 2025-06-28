import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { BaseMongoRepository } from '@project/data-access';
import { Nullable } from '@project/helpers';

import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenModel } from './refresh-token.model';
import { RefreshTokenFactory } from './refresh-token.factory';

@Injectable()
export class RefreshTokenRepository extends BaseMongoRepository<RefreshTokenEntity, RefreshTokenModel> {
  constructor(
    entityFactory: RefreshTokenFactory,
    @InjectModel(RefreshTokenModel.name) refreshTokenModel: Model<RefreshTokenModel>
    ) {
    super(entityFactory, refreshTokenModel);
  }

  public async findByTokenId(tokenId: string): Promise<Nullable<RefreshTokenEntity>> {
    const refreshTokenDocument = await this.model.findOne({ tokenId }).exec();
    if (!refreshTokenDocument) {
      return null;
    }

    return this.createEntityFromDocument(refreshTokenDocument);
  }

  public async deleteByTokenId(tokenId: string) {
    return this.model.deleteOne({ tokenId }).exec();
  }

  public async deleteExpiredTokens(): Promise<void> {
    this.model.deleteMany({ expiresIn: { $lt: new Date()}})
  }
}
