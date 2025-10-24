import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class AddUserRequest {
  @AutoMap()
  @ApiProperty()
  public email: string;
}
