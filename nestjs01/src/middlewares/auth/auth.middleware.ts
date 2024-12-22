import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`AuthMiddleware ==> Request: ${req.method} ${req.url}`);
    // return res.json({});

    next();
  }
}
