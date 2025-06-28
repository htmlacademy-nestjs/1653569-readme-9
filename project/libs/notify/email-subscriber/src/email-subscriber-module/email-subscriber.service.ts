import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateSubscriberDTO } from '../dto/create-subscriber.dto';
import { CreateSubscriptionDTO } from '../dto/create-subscription.dto';
import { SendNotifyDTO } from 'src/dto/send-notify.dto';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) { }

  public async registerSubscriber(subscriber: CreateSubscriberDTO): Promise<EmailSubscriberEntity> {
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(subscriber.email);
    if (existsSubscriber) {
      return existsSubscriber;
    }

    const emailSubscriber = new EmailSubscriberEntity(subscriber);
    await this.emailSubscriberRepository.save(emailSubscriber);

    return emailSubscriber;
  }

  public async updateSubscriber(dto: CreateSubscriptionDTO) {
    const existSubscriber = await this.emailSubscriberRepository.findByEmail(dto.email);
    if (!existSubscriber) {
      throw new NotFoundException(`Subscriber with email ${dto.email} not found`);
    }

    const existSubscriptionInitLength = existSubscriber.subscriptions.length;
    if (existSubscriber.subscriptions.includes(dto.subscriptionId)) {
      existSubscriber.subscriptions = existSubscriber.subscriptions.filter((id) => id !== dto.subscriptionId);
    } else {
      existSubscriber.subscriptions.push(dto.subscriptionId);
    }

    await this.emailSubscriberRepository.update(existSubscriber);
    return {isAddSubscription: existSubscriber.subscriptions.length > existSubscriptionInitLength, subscriber: existSubscriber};
  }

  public async filterPosts(dto: SendNotifyDTO) {
    const existSubscriber = await this.emailSubscriberRepository.findByEmail(dto.email);
    if (!existSubscriber) {
      throw new NotFoundException(`Subscriber with email ${dto.email} not found`);
    }

    const filteredPosts = dto.posts.filter((post) => {
      return (new Date(post.postedAt as Date) >= (existSubscriber.lastEmailDate ?? new Date(0))
        && existSubscriber.subscriptions.includes(post.userId))
    });

    Logger.log(`Filtered posts for ${existSubscriber.email}: ${filteredPosts.length}`);
    existSubscriber.lastEmailDate = new Date();
    await this.emailSubscriberRepository.update(existSubscriber);
    return { filteredPosts, subscriber: existSubscriber  }
  }
}
