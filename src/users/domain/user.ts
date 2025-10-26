import { AutoMap } from '@automapper/classes';
import { EUserRole } from './enums';

export class User {
  @AutoMap()
  public name: string;

  @AutoMap()
  public email: string;

  @AutoMap()
  public password: string;

  @AutoMap(() => String)
  public role: EUserRole;

  @AutoMap()
  public isActive: boolean;

  constructor(
    name: string,
    email: string,
    password: string,
    role: EUserRole,
    isActive: boolean,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.isActive = isActive;
  }
}
