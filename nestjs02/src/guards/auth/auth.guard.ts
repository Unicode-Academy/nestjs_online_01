import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
const apiKey =
  'ae91a3cebddb48060f027f393ae071eb28a86a3a6a00b1fdb52e400d56ad618c';
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const apiKeyFromHeader = request.headers['x-api-key'];
    const status = this.validateApiKey(apiKeyFromHeader);
    if (!status) {
      throw new UnauthorizedException('Unauthorized');
    }
    request.user = {
      id: 1,
      name: 'Hoàng An',
      roles: ['created', 'find-one'],
    };
    return status;
  }
  private validateApiKey(apiKeyFromHeader: string) {
    return apiKeyFromHeader === apiKey;
  }
}
