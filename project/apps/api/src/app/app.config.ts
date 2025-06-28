export enum ApplicationServiceURL {
  Users = 'http://localhost:3001/api/auth',
  Blog = 'http://localhost:3002/api/posts',
  Comments = 'http://localhost:3002/api/comments',
  Storage = 'http://localhost:3004'
}

export const HttpClient = {
  MaxRedirects: 5,
  Timeout: 3000,
} as const;
