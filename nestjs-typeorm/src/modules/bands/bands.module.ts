import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BandsController } from './bands.controller';
import { BandsService } from './bands.service';
import { Band } from '../../database/entities/band.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Band])],
  controllers: [BandsController],
  providers: [BandsService],
})
export class BandsModule {}
