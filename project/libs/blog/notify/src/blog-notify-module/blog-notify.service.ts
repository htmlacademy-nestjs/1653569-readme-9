import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { rabbitConfig } from '@project/blog-config';
import { RabbitRouting } from '@project/core';
import { BlogNotifyDTO } from '../dto/blog-notify.dto';

@Injectable()
export class BlogNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async sendEmail(dto: BlogNotifyDTO) {
    return this.rabbitClient.publish<BlogNotifyDTO>(
      this.rabbitOptions.exchange,
      RabbitRouting.SendNewPosts,
      { ...dto }
    )
  }
}
