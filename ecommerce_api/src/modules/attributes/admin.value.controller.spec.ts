import { Test, TestingModule } from '@nestjs/testing';
import { AdminValueController } from './admin.value.controller';

describe('AdminValueController', () => {
  let controller: AdminValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminValueController],
    }).compile();

    controller = module.get<AdminValueController>(AdminValueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
