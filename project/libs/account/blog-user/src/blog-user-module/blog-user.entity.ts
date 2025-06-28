import { compare, genSalt, hash } from 'bcrypt';

import { Entity, StorableEntity, AuthUser } from '@project/core';
import { SALT_ROUNDS, DEFAULT_AVATAR } from './blog-user.constants';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public name!: string;
  public email!: string;
  public avatar!: string;
  public createdAt!: Date;
  public postCount!: number;
  public subscriberCount!: number;
  public subscriptions!: string[];
  public passwordHash!: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? undefined;
    this.name = user.name;
    this.email = user.email;
    this.avatar = user.avatar ?? DEFAULT_AVATAR;
    this.createdAt = user.createdAt ?? new Date();
    this.postCount = user.postCount ?? 0;
    this.subscriberCount = user.subscriberCount ?? 0;
    this.subscriptions = user.subscriptions ?? [];
    this.passwordHash = user.passwordHash;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      createdAt: this.createdAt,
      postCount: this.postCount,
      subscriberCount: this.subscriberCount,
      subscriptions: this.subscriptions,
      passwordHash: this.passwordHash,
    }
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public async updateSubscription(userId: string) {
    const index = this.subscriptions.indexOf(userId);
    if (index !== -1) {
      this.subscriptions.splice(index, 1);
      this.subscriberCount--;
    } else {
      this.subscriptions.push(userId);
      this.subscriberCount++;
    }
  }
}
