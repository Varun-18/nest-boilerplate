import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@shared-base-lib';
import { EUserRole } from '../domain';

@Entity({ name: 'users', schema: 'core' })
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ select: false })
  password: string; // password hash, not selected by default

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: EUserRole, default: EUserRole.END_USER })
  role: EUserRole;
}
