import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { RabbitRouting } from '@project/core';
import { rabbitConfig } from '@project/account-config';

import { CreateSubscriberDTO } from '../dto/create-subscriber.dto';
import { CreateSubscriptionDTO } from '../dto/create-subscription.dto';

@Injectable()
export class AccountNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDTO) {
    return this.rabbitClient.publish<CreateSubscriberDTO>(
      this.rabbitOptions.exchange,
      RabbitRouting.RegisterSubscriber,
      { ...dto }
    );
  }

    public async updateSubscription(dto: CreateSubscriptionDTO) {
    return this.rabbitClient.publish<CreateSubscriptionDTO>(
      this.rabbitOptions.exchange,
      RabbitRouting.UpdateSubscription,
      { ...dto }
    )
  }
}
