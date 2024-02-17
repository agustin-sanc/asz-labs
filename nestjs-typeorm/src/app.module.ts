import { Module } from '@nestjs/common';
import { BandsModule } from './modules/bands/bands.module';
import { MusiciansModule } from './modules/musicians/musicians.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BandsModule,
    MusiciansModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
})
export class AppModule {}
