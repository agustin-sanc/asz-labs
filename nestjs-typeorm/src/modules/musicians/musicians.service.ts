import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Musician } from '../../database/entities/musician.entity';

@Injectable()
export class MusiciansService {
  constructor(
    @InjectRepository(Musician)
    private readonly musicianRepository: Repository<Musician>,
  ) {}

  findAll = () => this.musicianRepository.find();

  findOne = (id: number) => this.musicianRepository.findOne({ where: { id } });

  create = (musician: Musician) => this.musicianRepository.save(musician);

  update = async (id: number, updatedMusician: Musician) => {
    await this.musicianRepository.update(id, updatedMusician);
    return this.musicianRepository.findOne({ where: { id } });
  };

  remove = (id: number) => this.musicianRepository.delete(id);
}
