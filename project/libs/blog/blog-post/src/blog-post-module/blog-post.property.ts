export const BlogPostApiProperty = {
  Id: {
    description: 'The unique post ID',
    example: '7aef6925-4fe5-4057-b5cc-cc7cf214df05'
  },
  Title: {
    description: 'The post title',
    example: 'Some amazing title'
  },
  Text: {
    description: 'The post content text',
    example: 'Some amazing text'
  },
  Announcement: {
    description: 'The post announcement text',
    example: 'Some amazing announcement'
  },
  Description: {
    description: 'The post description text',
    example: 'Some amazing description'
  },
  Quote: {
    description: 'The post quote text',
    example: 'Some amazing quote'
  },
  Author: {
    description: 'The post quote author name',
    example: 'Alex Smith'
  },
  CreatedDate: {
    description: 'The post creation date',
    example: '2025-01-01T00:00:00.000Z'
  },
  UpdatedDate: {
    description: 'The post update date',
    example: '2025-05-01T00:00:00.000Z'
  },
  LinkPath: {
    description: 'The post media content path',
    example: '/img/post.jpg'
  },
  RepostPostId: {
    description: 'The post ID that was reposted',
    example: '7aef6925-4fe5-4057-b5cc-cc7cf214df05'
  },
  RepostUserId: {
    description: 'The user ID that was reposted',
    example: 'f2cef253-8057-4746-9ea3-bff8a98b48ea'
  },
  IsReposted: {
    description: 'The flag indicating whether the post is reposted',
    example: 'true'
  },
  CommentCount: {
    description: 'The number of comments',
    example: '4'
  },
  LikeCount: {
    description: 'The number of likes',
    example: '2'
  },
  UserId: {
    description: 'The user ID that was created the post',
    example: '90fea18a-a714-44ba-9503-23f093cefb16'
  },
  State: {
    description: 'The post state',
    example: 'published'
  },
  Tags: {
    description: 'The post tags',
    example: ['tag1', 'tag2']
  },
  Type: {
    description: 'The post type',
    example: 'video'
  },
} as const;
