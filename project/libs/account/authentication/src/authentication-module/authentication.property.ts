export const AuthUserApiProperty = {
  Id: {
    description: 'The unique user ID',
    example: '90fea18a-a714-44ba-9503-23f093cefb16'
  },
  Email: {
    description: 'The unique user email',
    example: 'user@local.com'
  },
  Name: {
    description: 'The user name',
    example: 'Alex'
  },
  Password: {
    description: 'The user password',
    example: 'password'
  },
  AvatarPath: {
    description: 'The user avatar path',
    example: '/img/avatar.jpg'
  },
  AccessToken: {
    description: 'The user access JWT token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30'
  }
} as const;
