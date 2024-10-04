import { Test, TestingModule } from '@nestjs/testing';
import { BloggingService } from './blogging.service';

describe('BloggingService', () => {
  let service: BloggingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloggingService],
    }).compile();

    service = module.get<BloggingService>(BloggingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
