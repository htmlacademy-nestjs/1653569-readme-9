export interface User {
  id?: string,
  name: string,
  email: string,
  avatarPath: string,
  createdAt: Date;
  postCount: number;
  subscribers: string[];
}
