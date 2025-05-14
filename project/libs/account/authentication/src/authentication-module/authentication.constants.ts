import { HttpStatus } from "@nestjs/common";
import { AuthUserApiProperty } from "./authentication.property";
import { LoggedUserRDO } from "../rdo/logged-user.rdo";
import { UserRDO } from "../rdo/user.rdo";

export const AuthUserMessage = {
  AlreadyExists: 'User with this email exists',
  NotFound: 'User not found',
  PasswordWrong: 'User password is wrong',
} as const;

export const AuthUserApiOperation = {
  Register: { summary: "Register user" },
  Login: { summary: "Logs user in blog" },
  User: { summary: "Get user by user ID" },
} as const;

export const AuthUserApiParam = {
  UserId: {
    name: 'id',
    schema: AuthUserApiProperty.Id
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
    description: AuthUserMessage.AlreadyExists
  },
  LoggedSuccess: {
    status: HttpStatus.OK,
    description: 'User was logged',
    type: LoggedUserRDO,
  },
  LoggedError: {
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or login is wrong'
  },
  Found: {
    status: HttpStatus.OK,
    description: 'User found',
    type: UserRDO,
  },
  NotFound: {
    status: HttpStatus.NOT_FOUND,
    description: AuthUserMessage.NotFound
  }
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
