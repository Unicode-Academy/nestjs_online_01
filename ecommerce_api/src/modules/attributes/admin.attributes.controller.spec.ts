import { Test, TestingModule } from '@nestjs/testing';
import { AdminAttributesController } from './admin.attributes.controller';

describe('AdminAttributesController', () => {
  let controller: AdminAttributesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminAttributesController],
    }).compile();

    controller = module.get<AdminAttributesController>(AdminAttributesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
