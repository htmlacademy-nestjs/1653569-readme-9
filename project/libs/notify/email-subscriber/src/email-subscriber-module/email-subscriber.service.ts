import { Injectable } from '@nestjs/common';

import { EmailSubscriberEntity } from './email-subscriber.entity';
import { CreateSubscriberDTO } from '../dto/create-subscriber.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDTO) {
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(subscriber.email);
    if (existsSubscriber) {
      return existsSubscriber;
    }

    const emailSubscriber = new EmailSubscriberEntity(subscriber);
    await this.emailSubscriberRepository.save(emailSubscriber);

    return emailSubscriber;
  }
}
