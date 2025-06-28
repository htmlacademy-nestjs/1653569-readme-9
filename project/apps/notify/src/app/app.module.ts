import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { NotifyConfigModule, getMongooseOptions } from '@project/notify-config';
import { EmailSubscriberModule } from '@project/email-subscriber';
import { getRabbitMQOptions } from '@project/helpers';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions('application.rabbit')),
    NotifyConfigModule,
    EmailSubscriberModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
