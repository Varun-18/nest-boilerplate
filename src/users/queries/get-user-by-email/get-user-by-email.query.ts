import { AutoMap } from '@automapper/classes';
import { QueryBase } from '@shared-base-lib';

export class GetUserByEmailQuery extends QueryBase {
  @AutoMap()
  public email: string;
}
