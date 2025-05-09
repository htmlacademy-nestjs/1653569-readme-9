export interface User {
  id?: string,
  name: string,
  email: string,
  avatarPath?: string,
  registerDate?: Date;
  postCount?: number;
  subscriberCount?: number;
}
