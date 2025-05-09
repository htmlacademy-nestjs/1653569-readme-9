export const BlogCommentApiProperty = {
  Id: {
    description: 'The unique comment ID',
    example: '7b25c114-e19f-4a46-928b-a8ba4588a2d0'
  },
  Text: {
    description: 'The comment content text',
    example: 'Some amazing comment'
  },
  UserId: {
    description: 'The unique user ID',
    example: 'a6da0ca2-6239-41a3-9f18-2f4280a6da78'
  },
  PostId: {
    description: 'The unique post ID',
    example: '7aef6925-4fe5-4057-b5cc-cc7cf214df05'
  },
  CreateDate: {
    description: 'The date and time when the comment was created',
    example: '2022-01-01T12:00:00Z'
  },
} as const;
