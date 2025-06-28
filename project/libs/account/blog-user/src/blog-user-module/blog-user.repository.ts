import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { BaseMongoRepository } from '@project/data-access';
import { BlogUserEntity } from './blog-user.entity';
import { BlogUserFactory } from './blog-user.factory';
import { BlogUserModel } from './blog-user.model';
import { Nullable } from '@project/helpers';

@Injectable()
  export class BlogUserRepository extends BaseMongoRepository<BlogUserEntity, BlogUserModel> {
    constructor(
      entityFactory: BlogUserFactory,
      @InjectModel(BlogUserModel.name) blogUserModel: Model<BlogUserModel>
    ) {
    super(entityFactory, blogUserModel);
  }

  public async findByEmail(email: string): Promise<Nullable<BlogUserEntity>> {
    const document = await this.model.findOne({ email }).exec();
    if (!document) {
      return null;
    }

    return this.createEntityFromDocument(document);
  }

  public async findSubscriptions(userId: string): Promise<BlogUserEntity[]> {
    const documents = await this.model.find({ subscriptions: userId }).exec();
    return documents
      .map((document) => this.createEntityFromDocument(document))
      .filter((entity): entity is BlogUserEntity => entity !== null);
  }
}
