import { compare, genSalt, hash } from 'bcrypt';

import { Entity, StorableEntity, AuthUser } from '@project/core';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public name!: string;
  public email!: string;
  public avatarPath!: string;
  public createdAt!: Date;
  public postCount!: number;
  public subscribers!: string[];
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
    this.avatarPath = user.avatarPath ?? '';
    this.createdAt = user.createdAt ?? new Date();
    this.postCount = user.postCount ?? 0;
    this.subscribers = user.subscribers ?? [];
    this.passwordHash = user.passwordHash;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatarPath: this.avatarPath,
      createdAt: this.createdAt,
      postCount: this.postCount,
      subscribers: this.subscribers,
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
}
