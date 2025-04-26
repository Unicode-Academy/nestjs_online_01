import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { AllExceptionsFilter } from './common/exceptions/http-exception';
import { useContainer, ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //Tự động chuyển kiểu dữ liệu
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(
          errors.map((error) => {
            return {
              [error.property]: Object.values(error.constraints)[0],
            };
          }),
        );
      },
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// --> /api/v1/users
