import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { BandsModule } from '../../../src/modules/bands/bands.module';
import { Band } from '../../../src/database/entities/band.entity';
import { BandsService } from '../../../src/modules/bands/bands.service';
import { dataSourceOptions } from '../../../src/database/data-source';
import { Musician } from '../../../src/database/entities/musician.entity';
import {
  runInTransaction,
  initialiseTestTransactions,
} from 'typeorm-test-transactions';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

initializeTransactionalContext();

const testModuleConfig = {
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      entities: [Band, Musician],
    }),
    BandsModule,
  ],
  providers: [
    {
      provide: getRepositoryToken(Band),
      useFactory: (connection: EntityManager) => connection.getRepository(Band),
      inject: [EntityManager],
    },
  ],
};

describe('BandsService -> list (integration tests)', () => {
  let module: TestingModule;
  let bandsService: BandsService;

  beforeAll(async () => {
    module = await Test.createTestingModule(testModuleConfig).compile();

    await module.init();

    bandsService = module.get<BandsService>(BandsService);
  });

  afterAll(async () => await module.close());

  it('should return an array of bands', async () => {
    await runInTransaction(async () => {
      const result = await bandsService.list();

      console.log(result);
      expect(result).toHaveLength(2);
      // expect(result[0].name).toBe('Sleep Token');
      // expect(result[1].name).toBe('Children of Bodom');
    })();
    // await entityManager.transaction(async (transactionalEntityManager) => {
    //   await transactionalEntityManager.save(Band, [
    //     {
    //       name: 'Sleep Token',
    //       genre: 'Alternative Metal',
    //       birthDate: new Date(),
    //       musicians: [],
    //     },
    //     {
    //       name: 'Children of Bodom',
    //       genre: 'Melodic Death Metal',
    //       birthDate: new Date(),
    //       musicians: [],
    //     },
    //   ]);
    //
    //   const result = await bandsService.list();
    //
    //   expect(result).toHaveLength(2);
    //   expect(result[0].name).toBe('Sleep Token');
    //   expect(result[1].name).toBe('Children of Bodom');
    // });
  });
});
