import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const logger = new Logger('Bootstrap');
  app.useLogger(false); // Kích hoạt các mức log
  // logger.log('Ứng dụng đang khởi động...');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //Tự động chuyển kiểu dữ liệu
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(
          errors.map((error) => {
            return {
              [error.property]: Object.values(error.constraints),
            };
          }),
        );
      },
    }),
  );
  app.use(new LoggerMiddleware().use); //Đăng ký global middleware
  // app.use(new AuthMiddleware().use);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
