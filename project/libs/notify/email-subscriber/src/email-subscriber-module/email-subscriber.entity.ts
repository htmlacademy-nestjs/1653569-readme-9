import { Entity, StorableEntity, Subscriber } from '@project/core';

export class EmailSubscriberEntity extends Entity implements StorableEntity<Subscriber> {
  public email!: string;
  public name!: string;
  public subscriptions!: string[];
  public lastEmailDate!: Date;

  constructor(subscriber?: Subscriber) {
    super();
    this.populate(subscriber);
  }

  public populate(subscriber?: Subscriber): void {
    if (!subscriber) {
      return;
    }

    this.id = subscriber.id ?? undefined;
    this.name = subscriber.name;
    this.email = subscriber.email;
    this.subscriptions = subscriber.subscriptions ?? [];
    this.lastEmailDate = subscriber.lastEmailDate ?? new Date();
  }

  public toPOJO(): Subscriber {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      subscriptions: this.subscriptions,
      lastEmailDate: this.lastEmailDate,
    }
  }
}
