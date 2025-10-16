import { Module } from '@nestjs/common';
import { AutomapperModule } from 'nestjsx-automapper';
import { SharedBaseLibModule } from 'src/libs';

@Module({
  imports: [SharedBaseLibModule, AutomapperModule.withMapper('users', {})],
})
export class UsersModule {}
