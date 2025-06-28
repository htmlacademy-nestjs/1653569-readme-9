export const DEFAULT_HOST = 'localhost';
export const DECIMAL_RADIX = 10;

export const AuthToken = {
  Name: 'AUTHORIZATION',
  Access: 'Bearer + accessToken',
  Refresh: 'Bearer + refreshToken',
} as const;

export const HttpClient = {
  MaxRedirects: 5,
  Timeout: 3000,
} as const;

export const RabbitRouting = {
  AddSubscriber: 'notify.addSubscriber',
  SendNewPosts: 'notify.sendNewPosts',
} as const;

export const PostType = {
  Video: 'video',
  Text: 'text',
  Quote: 'quote',
  Photo: 'photo',
  Link: 'link',
} as const;
