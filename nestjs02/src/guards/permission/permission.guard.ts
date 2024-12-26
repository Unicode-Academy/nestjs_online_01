import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //Lấy thông tin user
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const roles = user.roles;
    console.log(roles);

    //Kiểm tra quyền hạn của user
    const isPermission = false;
    return isPermission;
  }
}
