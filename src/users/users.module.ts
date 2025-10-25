import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { SharedBaseLibModule } from '@shared-base-lib';
import { LoggerModule } from 'nestjs-pino';
import CommandHandlers from './commands';
import { MappingProfiles } from './helpers';
import { UsersController } from './users.controller';

@Module({
  imports: [
    SharedBaseLibModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    LoggerModule.forRoot(),
  ],
  controllers: [UsersController],
  providers: [...MappingProfiles, ...CommandHandlers],
  exports: [...MappingProfiles, ...CommandHandlers],
})
export class UsersModule {}
