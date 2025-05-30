export const AuthUserApiProperty = {
  Id: {
    description: 'The unique user ID',
    example: '6831db2570e279f3516bd62d'
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
  RegisterDate: {
    description: 'The user register date',
    example: '2022-01-01T00:00:00.000Z'
  },
  PostCount: {
    description: 'The user post count',
    example: 10
  },
  Subscribers: {
    description: 'The user\'s subscribers',
    example: ['6831db2570e279f3516bd62d', '2484db2570e279f3516bd62e']
  },
  AccessToken: {
    description: 'The user access JWT token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30'
  }
} as const;
