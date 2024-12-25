import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    // console.log(`Request ${request.url} - ${request.method}`);
    //Thời gian bắt đầu request
    const startTime = Date.now();
    return next.handle().pipe(
      map((data) => {
        // const endTime = Date.now();
        // console.log('Response - Time: ', endTime - startTime);
        return data;
      }),
    );
  }
}
