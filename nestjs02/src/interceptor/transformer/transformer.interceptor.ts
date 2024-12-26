import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const transform = (item: any) => {
      return {
        UID: item.id,
        fullname: item.name,
        email: item.email,
        status: item.status,
        statusText: item.status ? 'Active' : 'Inactive',
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      };
    };
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map(transform);
        }
        return transform(data);
      }),
    );
  }
}
