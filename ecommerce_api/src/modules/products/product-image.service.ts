import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from 'src/entities/product-image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImagesRepository: Repository<ProductImage>,
  ) {}

  create(data: any) {
    return this.productImagesRepository.save(data);
  }

  delete(id: number) {
    return this.productImagesRepository.delete(id);
  }

  async findOrCreate(data: any) {
    const image = await this.productImagesRepository.findOne({
      where: {
        image: data.image,
      },
    });
    if (image) {
      return image;
    }
    return this.create(data);
  }
}
