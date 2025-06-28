import { HttpStatus } from "@nestjs/common";

import { AuthToken } from "@project/helpers";
import { AuthUserApiProperty } from "./authentication.property";
import { LoggedUserRDO } from "../rdo/logged-user.rdo";
import { UserRDO } from "../rdo/user.rdo";
import { UpdateTokensRDO } from "../rdo/update-tokens.rdo";

export const AuthUserMessage = {
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserIdNotFound: 'User with this userID not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created.',
  EmailNotFound: 'User with this email not found',
  EmailNotValid: 'User email is not valid',
  WrongPassword: 'User password is wrong',
  ComparePassword: 'Current user password matches new password',
  UpdatePassword: 'Your password was successfully updated',
  Unauthorized: 'You should be authorized',
  LoggedSuccess: 'User has been successfully logged.',
  LoggedError: 'Password or Login is wrong.',
  RefreshTokens: 'Get a new access/refresh tokens',
  WrongToken: 'Your token is not valid or expired',
  SubscribeSelf: 'You cannot subscribe to yourself.',
  SubscriptionFound:'Subscription already exists.',
  SubscriptionNotFound: 'Subscription not found.',
} as const;

export const AuthUserApiOperation = {
  Register: { summary: 'Register user' },
  Login: { summary: 'Authorization by login and password' },
  User: { summary: 'Get user by userID' },
  ChangePassword: { summary: 'Change user password' },
  Subscribe: { summary: 'Subscribe to user' },
  Unsubscribe: { summary: 'Unsubscribe from user' },
  Subscriptions: { summary: 'Get user subscriptions' },
  RefreshToken: { summary: 'Get new pair access, refresh token' },
  CheckAuth: { summary: 'Check user authentication' },
} as const;

export const AuthUserApiParam = {
  UserId: {
    name: 'id',
    schema: AuthUserApiProperty.Id
  }
} as const;

export const AuthUserApiHeader = {
  AccessToken: {
    name: AuthToken.Name,
    description: AuthToken.Access,
    required: true,
  },
  RefreshToken: {
    name: AuthToken.Name,
    description: AuthToken.Refresh,
    required: true,
  }
} as const;

export const AuthUserApiResponse = {
  Created: {
    status: HttpStatus.CREATED,
    description: 'New user was created',
    type: UserRDO,
  },
  Exists: {
    status: HttpStatus.CONFLICT,
    description: AuthUserMessage.UserExist
  },
  Logged: {
    status: HttpStatus.OK,
    description: 'User has been logged',
    type: LoggedUserRDO,
  },
  Subscribe: {
    status: HttpStatus.OK,
    description: 'User has been subscribed',
  },
  Unsubscribe: {
    status: HttpStatus.OK,
    description: 'User has been unsubscribed',
  },
  Unauthorized: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or login is wrong'
  },
  UpdatePassword: {
    status: HttpStatus.CREATED,
    description: 'Password has been updated'
  },
  Found: {
    status: HttpStatus.OK,
    description: 'User has been found',
    type: UserRDO,
  },
  EmailNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: AuthUserMessage.EmailNotFound
  },
  UserIdNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: AuthUserMessage.UserIdNotFound
  },
  RefreshToken: {
    status: HttpStatus.OK,
    description: AuthUserMessage.RefreshTokens,
    type: UpdateTokensRDO,
  },
} as const;

export const AuthUserValidateLength = {
  Name: {
    Min: 3,
    Max: 50,
  },
  Password: {
    Min: 6,
    Max: 12,
  }
} as const;
