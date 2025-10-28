import { AutoMap } from '@automapper/classes';
import { EUserRole } from './enums';

export class User {
  @AutoMap()
  public id: string;

  @AutoMap()
  public createdAt: string;

  @AutoMap()
  public updatedAt: string;

  @AutoMap()
  public deletedAt: string;

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
}
