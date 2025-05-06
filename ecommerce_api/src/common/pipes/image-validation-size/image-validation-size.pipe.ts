import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImageValidationSizePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const oneMb = 1024 * 1024;

    return value.size < oneMb;
  }
}
