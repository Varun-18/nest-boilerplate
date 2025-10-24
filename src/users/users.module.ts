import { Module } from '@nestjs/common';
import { SharedBaseLibModule } from 'src/libs';
import { UsersController } from './users.controller';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { MappingProfiles } from './helpers';

@Module({
  imports: [
    SharedBaseLibModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [UsersController],
  providers: [...MappingProfiles],
  exports: [...MappingProfiles],
})
export class UsersModule {}
