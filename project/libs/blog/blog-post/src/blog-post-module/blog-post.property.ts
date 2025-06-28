export const BlogPostApiProperty = {
  Id: {
    description: 'The unique post ID',
    example: '7aef6925-4fe5-4057-b5cc-cc7cf214df05'
  },
  PostedDate: {
    description: 'The posting date',
    example: '2025-01-01T00:00:00.000Z',
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
  Url: {
    description: 'The URL of the post content',
    example: 'https://youtube.com/video.mp4'
  },
  Static: {
    description: 'The URL of the photo post.',
    example: '/path/to/storage',
  },
  RepostPostId: {
    description: 'The post ID that was reposted',
    example: '7aef6925-4fe5-4057-b5cc-cc7cf214df05'
  },
  RepostUserId: {
    description: 'The user ID that was reposted',
    example: '6855c357ab27ea21d6cdfa01'
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
    example: '6855c357ab27ea21d6cdfa01'
  },
  Email: {
    description: 'The user email',
    example: 'examlpe@expample.com'
  },
  Status: {
    description: 'The post status',
    example: 'published'
  },
  Boolean: {
    description: 'The post boolean flag',
    example: 'true'
  },
  Tags: {
    description: 'The post tags',
    example: ['tag1', 'tag2']
  },
  Type: {
    description: 'The post type',
    example: 'video'
  },
  Entities: {
    description: 'List of items of selected Entity',
    example: ['Post1', 'Post2']
  },
  TotalPages: {
    description: 'Total page count of selected entity',
    example: 10
  },
  CurrentPages: {
    description: 'Current page number',
    example: 2
  },
  TotalItems: {
    description: 'Total items count of selected entity',
    example: 50
  },
  ItemsPerPage: {
    description: 'Number of items on one page',
    example: 20
  },
} as const;
