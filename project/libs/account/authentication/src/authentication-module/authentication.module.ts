import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccountNotifyModule } from '@project/account-notify';

import { BlogUserModule } from '@project/blog-user';
import { getJwtOptions } from '@project/account-config';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';

@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    AccountNotifyModule
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtAccessStrategy]
})
export class AuthenticationModule {}
