import { UserEnum } from '@/users/dto/user-enum';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesRequired = this.reflector.get<UserEnum[]>(
      'roles',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();

    console.log('\n==== RolesGuard ====');
    console.log('Request user\n', JSON.stringify(request.user, null, 2));
    console.log('Roles Required', rolesRequired);

    // if no-one role is informed, any user can access
    if (!rolesRequired || !rolesRequired.length) {
      return true;
    }

    const hasPermission = rolesRequired.includes(request.user.type);
    if (!hasPermission) throw new UnauthorizedException();

    return hasPermission;
  }
}
