import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Band } from '../../database/entities/band.entity';

@Injectable()
export class BandsService {
  constructor(
    @InjectRepository(Band)
    private readonly bandRepository: Repository<Band>,
  ) {}

  list = () => this.bandRepository.find();

  findOne = (id: number) => this.bandRepository.findOne({ where: { id } });

  create = (band: Band) => this.bandRepository.save(band);

  update = async (id: number, updatedBand: Band) => {
    await this.bandRepository.update(id, updatedBand);
    return this.bandRepository.findOne({ where: { id } });
  };

  remove = (id: number) => this.bandRepository.delete(id);
}
