import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { EUserRole } from '../domain';

export class AddUserRequest {
  @AutoMap()
  @ApiProperty()
  public name: string;

  @AutoMap()
  @ApiProperty()
  public email: string;

  @AutoMap()
  @ApiProperty()
  public password: string;

  @AutoMap(() => String)
  @ApiProperty()
  public role: EUserRole;

  @AutoMap()
  @ApiProperty()
  public isActive: boolean;
}
