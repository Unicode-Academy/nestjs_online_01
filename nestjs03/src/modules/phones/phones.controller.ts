import { Controller } from '@nestjs/common';
import { PhonesService } from './phones.service';

@Controller('phones')
export class PhonesController {
  constructor(private readonly phonesService: PhonesService) {}
}
