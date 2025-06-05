import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { RabbitRouting } from '@project/core';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDTO } from '../dto/create-subscriber.dto';
import { MailService } from '../mail-module/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    routingKey: RabbitRouting.AddSubscriber,
    exchange: 'readme.notify.exchange',
    queue: 'readme.notify.income',
  })
  public async create(subscriber: CreateSubscriberDTO) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }
}
