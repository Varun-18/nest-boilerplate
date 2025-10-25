import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserByEmailRequest {
  @AutoMap()
  @ApiProperty({ description: 'User Email', required: true })
  public email: string;
}
