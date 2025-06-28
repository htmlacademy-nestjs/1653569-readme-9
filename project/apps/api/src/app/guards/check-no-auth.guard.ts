import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CheckNoAuthGuard implements CanActivate {

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers['authorization']) {
      throw new Error('Registration is only available to unauthorized users');
    }

    return true;
  }
}
