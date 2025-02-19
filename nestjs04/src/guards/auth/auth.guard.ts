import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token =
      request.get('authorization')?.split(' ').slice(-1).join() ?? '';
    const user = await this.authService.getUser(token);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    //Cắm thông tin user vào request
    const decoded = this.authService.decodeToken(token);
    request.user = user;
    request.user.access_token = token;
    request.user.token_exp = decoded.exp;
    return true;
  }
}
