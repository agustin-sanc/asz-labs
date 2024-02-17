import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Musician } from './musician.entity';

@Entity()
export class Band {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  genre: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @ManyToMany(() => Musician, (musician) => musician.bands)
  @JoinTable()
  musicians: Musician[];
}
