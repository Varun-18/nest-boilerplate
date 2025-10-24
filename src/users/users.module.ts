import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { SharedBaseLibModule } from 'src/libs';
import { MappingProfiles } from './helpers';
import { UsersController } from './users.controller';

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
