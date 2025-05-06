import { Controller } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { VERSION } from 'src/constants/version';

@Controller({
  version: VERSION.V1,
  path: 'brands',
})
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}
}
