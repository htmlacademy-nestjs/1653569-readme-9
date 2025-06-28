export const AccountNotifyMessage = {
  EmailNotValid: 'The email is not valid',
  NameIsEmpty: 'The name is empty',
} as const;

export const AccountApiProperty = {
  Email: {
    description: 'Email of the subscriber',
    example: 'example@example.com'
  },
  Name: {
    description: 'Name of the subscriber',
    example: 'Max Mustermann'
  },
  SubscriberId: {
    description: 'Subscriber ID',
    example: '7d03edk85eadb23d75f3c29w'
  },
  Subscription: {
    description: 'Subscription\'s userId',
    example: '7d03edk85eadb23d75f3c29w'
  }
}
