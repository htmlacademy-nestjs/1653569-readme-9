export interface Comment {
  id?: string;
  text: string;
  userId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}
