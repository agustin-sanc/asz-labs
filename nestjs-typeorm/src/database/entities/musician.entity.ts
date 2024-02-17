import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Band } from './band.entity';

@Entity()
export class Musician {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  instrument: string;

  @ManyToMany(() => Band, (band) => band.musicians)
  @JoinTable()
  bands: Band[];
}
