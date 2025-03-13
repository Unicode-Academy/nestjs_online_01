import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { getPermissions } from 'src/utils/utils';

export const PermissionGuard = (value: string) => {
  @Injectable()
  class PermissionGuardMixin implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();
      const permissions = getPermissions(request.user);
      return permissions.includes(value);
    }
  }
  return PermissionGuardMixin;
};
