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
    return next.handle().pipe(
      map((data) => {
        // return data.map((item: any) => {
        //   return {
        //     UID: item.id,
        //     fullname: item.name,
        //     email: item.email,
        //     status: item.status,
        //     statusText: item.status ? 'Active' : 'Inactive',
        //     createdAt: item.created_at,
        //     updatedAt: item.updated_at,
        //   };
        // });
        return data;
      }),
    );
  }
}
