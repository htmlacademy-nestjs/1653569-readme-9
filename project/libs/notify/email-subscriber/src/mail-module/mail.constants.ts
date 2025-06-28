export const SendEmailMessage = {
  UserRegister: 'New user registered',
  AddSubscriber: 'New subscriber to the newsletter',
  RemoveSubscriber: 'Subscriber removed from the newsletter',
  NewPosts: 'New posts published',
  NoPosts: 'No new posts published',
} as const

export const SendEmailTemplate = {
  UserRegister: './user-register',
  AddSubscriber: './add-subscriber',
  RemoveSubscriber: './remove-subscriber',
  NewPosts: './new-posts',
  NoNewPosts: './no-new-posts',
} as const
