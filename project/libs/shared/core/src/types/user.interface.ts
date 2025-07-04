export interface User {
  id?: string,
  name: string,
  email: string,
  avatar?: string,
  createdAt: Date;
  postCount: number;
  subscriberCount: number;
  subscriptions: string[];
}
