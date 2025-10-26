import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@shared-base-lib';
import { UserRole } from '../domain';

@Entity({ name: 'users', schema: 'core' })
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ select: false })
  password: string; // password hash, not selected by default

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.END_USER })
  role: UserRole;
}
