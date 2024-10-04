import { Test, TestingModule } from '@nestjs/testing';
import { BloggingController } from './blogging.controller';
import { BloggingService } from './blogging.service';

describe('BloggingController', () => {
  let controller: BloggingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloggingController],
      providers: [BloggingService],
    }).compile();

    controller = module.get<BloggingController>(BloggingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
