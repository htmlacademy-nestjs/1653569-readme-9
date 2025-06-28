import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { Post, Subscriber } from '@project/core';
import { NotifyConfig } from '@project/notify-config';
import { SendEmailMessage, SendEmailTemplate } from './mail.constants';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService
  ) {}

  @Inject(NotifyConfig.KEY)
  private readonly notifyConfig!: ConfigType<typeof NotifyConfig>

  public async sendNotifyRegisterSubscriber(subscriber: Subscriber) {
    Logger.log(`Send email to ${subscriber.email} register`)
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: subscriber.email,
      subject: SendEmailMessage.UserRegister,
      template: SendEmailTemplate.UserRegister,
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendNotifyUpdateSubscriber(subscriber: Subscriber, isAddSubscription: boolean) {
    Logger.log(`Send email to ${subscriber.email} ${isAddSubscription ? 'add' : 'remove'} subscription`)
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: subscriber.email,
      subject: isAddSubscription ? SendEmailMessage.AddSubscriber : SendEmailMessage.RemoveSubscriber,
      template: isAddSubscription ? SendEmailTemplate.AddSubscriber : SendEmailTemplate.RemoveSubscriber,
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendNotifyNewPosts(posts: Post[], subscriber: Subscriber) {
    Logger.log(`Send email to ${subscriber.email} new posts`)
    if (posts.length) {
      await this.mailerService.sendMail({
        from: this.notifyConfig.mail.from,
        to: subscriber.email,
        subject: SendEmailMessage.NewPosts,
        template: SendEmailTemplate.NewPosts,
        context: {
          user: `${subscriber.name}`,
          posts: posts.map((post) => (post))
        }
      })
    } else {
      await this.mailerService.sendMail({
        from: this.notifyConfig.mail.from,
        to: subscriber.email,
        subject: SendEmailMessage.NoPosts,
        template: SendEmailTemplate.NoNewPosts,
        context: {
          user: `${subscriber.name}`
        }
      })
    }
  }
}
