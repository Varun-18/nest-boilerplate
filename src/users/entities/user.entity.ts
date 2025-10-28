import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@shared-base-lib';
import { EUserRole } from '../domain';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'users', schema: 'core' })
export class UserEntity extends BaseEntity {
  @AutoMap()
  @Column({ unique: true })
  email: string;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column({ select: false })
  password: string; // password hash, not selected by default

  @AutoMap()
  @Column({ default: true })
  isActive: boolean;

  @AutoMap()
  @Column({ type: 'enum', enum: EUserRole, default: EUserRole.END_USER })
  role: EUserRole;
}
