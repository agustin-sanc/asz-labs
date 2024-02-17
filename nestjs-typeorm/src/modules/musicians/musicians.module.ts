import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusiciansController } from './musicians.controller';
import { MusiciansService } from './musicians.service';
import { Musician } from '../../database/entities/musician.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Musician])],
  controllers: [MusiciansController],
  providers: [MusiciansService],
})
export class MusiciansModule {}
