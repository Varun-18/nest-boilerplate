import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedBaseLibModule } from '@shared-base-lib';
import { LoggerModule } from 'nestjs-pino';
import CommandHandlers from './commands';
import Entities from './entities';
import { MappingProfiles } from './helpers';
import { USER_REPO } from './providers';
import QueryHandlers from './queries';
import { UserRepository } from './repo';
import { UsersController } from './users.controller';

@Module({
  imports: [
    SharedBaseLibModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    LoggerModule.forRoot(),
    TypeOrmModule.forFeature([...Entities]),
  ],
  controllers: [UsersController],
  providers: [
    ...MappingProfiles,
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: USER_REPO,
      useClass: UserRepository,
    },
  ],
  exports: [
    ...MappingProfiles,
    ...CommandHandlers,
    ...QueryHandlers,
    USER_REPO,
  ],
})
export class UsersModule {}
