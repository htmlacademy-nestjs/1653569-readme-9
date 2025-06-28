import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { RabbitRouting } from '@project/core';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDTO } from '../dto/create-subscriber.dto';
import { CreateSubscriptionDTO } from '../dto/create-subscription.dto';
import { SendNotifyDTO } from '../dto/send-notify.dto';
import { MailService } from '../mail-module/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    routingKey: RabbitRouting.RegisterSubscriber,
    exchange: 'readme.notify.exchange',
    queue: 'readme.notify.register',
  })
  public async registerSubscriber(subscriber: CreateSubscriberDTO) {
    this.subscriberService.registerSubscriber(subscriber);
    this.mailService.sendNotifyRegisterSubscriber(subscriber);
  }

  @RabbitSubscribe({
    routingKey: RabbitRouting.UpdateSubscription,
    exchange: 'readme.notify.exchange',
    queue: 'readme.notify.update',
  })
  public async updateSubscription(subscription: CreateSubscriptionDTO) {
    const { subscriber, isAddSubscription } = await this.subscriberService.updateSubscriber(subscription);
    this.mailService.sendNotifyUpdateSubscriber(subscriber, isAddSubscription);
  }

  @RabbitSubscribe({
    routingKey: RabbitRouting.SendNewPosts,
    exchange: 'readme.notify.exchange',
    queue: 'readme.notify.send',
  })
  public async sendEmail(dto: SendNotifyDTO) {
    const { filteredPosts, subscriber } = await this.subscriberService.filterPosts(dto);
    this.mailService.sendNotifyNewPosts(filteredPosts, subscriber);
  }
}
