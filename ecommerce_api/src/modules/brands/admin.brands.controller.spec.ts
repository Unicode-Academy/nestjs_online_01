import { Test, TestingModule } from '@nestjs/testing';
import { AdminBrandsController } from './admin.brands.controller';

describe('AdminBrandsController', () => {
  let controller: AdminBrandsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminBrandsController],
    }).compile();

    controller = module.get<AdminBrandsController>(AdminBrandsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
