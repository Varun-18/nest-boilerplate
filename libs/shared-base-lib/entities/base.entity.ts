import { AutoMap } from '@automapper/classes';
import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as TypeOrmBase,
} from 'typeorm';

export abstract class BaseEntity extends TypeOrmBase {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @AutoMap()
  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
  deletedAt?: Date;
}
