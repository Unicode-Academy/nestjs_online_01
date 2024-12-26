import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptor/logging/logging.interceptor';
import { AuthGuard } from './guards/auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  // app.useGlobalGuards(new AuthGuard());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
