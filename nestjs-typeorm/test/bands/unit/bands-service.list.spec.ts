import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BandsService } from '../../../src/modules/bands/bands.service';
import { Band } from '../../../src/database/entities/band.entity';

describe('BandsService -> list (unit tests)', () => {
  let bandsService: BandsService;
  let bandRepository: Repository<Band>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BandsService,
        {
          provide: getRepositoryToken(Band),
          useClass: Repository,
        },
      ],
    }).compile();

    bandsService = module.get<BandsService>(BandsService);
    bandRepository = module.get<Repository<Band>>(getRepositoryToken(Band));
  });

  it('should return an array of bands', async () => {
    const bands: Band[] = [
      {
        id: 1,
        name: 'Sleep Token',
        genre: 'Alternative Metal',
        birthDate: new Date(),
        musicians: [],
      },
      {
        id: 2,
        name: 'Children of Bodom',
        genre: 'Melodic Death Metal',
        birthDate: new Date(),
        musicians: [],
      },
    ];

    jest.spyOn(bandRepository, 'find').mockResolvedValue(bands);

    const result = await bandsService.list();

    expect(result).toEqual(bands);
  });
});
