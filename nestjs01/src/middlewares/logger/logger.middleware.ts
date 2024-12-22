import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // console.log(`LoggerMiddleware ==> Request: ${req.method} ${req.url}`);
    // // return res.status(401).json({ message: 'Unauthorized' });
    // req.logging = 'Ahihi';
    const logger = new Logger('Request');
    logger.log(`Request: ${req.method} ${req.url}`);
    next();
  }
}
