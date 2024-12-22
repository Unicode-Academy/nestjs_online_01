import { BadRequestException, Inject, PipeTransform } from '@nestjs/common';

export class UpdateValidationPipe implements PipeTransform {
  constructor(@Inject('REQUEST') private readonly request: Request) {}
  transform(body: any) {
    const id = this.request['params'].id;

    if (body.email === 'hoangan.web@gmail.com' && +id !== 1) {
      throw new BadRequestException('Email đã tồn tại');
    }
    return body;
  }
}
