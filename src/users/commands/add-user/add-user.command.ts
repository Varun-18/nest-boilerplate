import { AutoMap } from '@automapper/classes';
import { CommandBase } from '@shared-base-lib';
import { EUserRole } from '../../domain';

export class AddUserCommand extends CommandBase {
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
