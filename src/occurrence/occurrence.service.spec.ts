import { Test, TestingModule } from '@nestjs/testing';
import { OccurrenceService } from './occurrence.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Occurrence } from './entities/occurrence.entity';
import { CreateOccurrenceDto } from './dto/create-occurence.dto';
import { UserEnum } from '@/users/dto/user-enum';
import { User } from '@/users/entities/user.entity';
import { MakeUser } from '@/users/factories/make-user';

describe('OccurrenceService', () => {
  let service: OccurrenceService;
  let mockOccurrenceRepository = {
    find: jest.fn(),
    findAndCount: jest.fn(),
    save: jest.fn(),
  };
  let mockUserRepository = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OccurrenceService,
        {
          provide: getRepositoryToken(Occurrence),
          useValue: mockOccurrenceRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<OccurrenceService>(OccurrenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able an citizen create a new occurrence', async () => {
    const citizen = MakeUser({ type: UserEnum.CITIZEN });
    mockUserRepository.findOneBy.mockResolvedValue(citizen);

    const createOccurrenceDto: CreateOccurrenceDto = {
      title: 'Test Occurrence',
      affectedArea: 'street',
      category: 'Test Category',
      description: 'Test Description',
      subCategory: 'Test Sub Category',
    };

    await service.create(citizen.id, createOccurrenceDto);

    expect(mockOccurrenceRepository.save).toHaveBeenCalledWith({
      ...createOccurrenceDto,
      userId: citizen.id,
    });
  });
});
