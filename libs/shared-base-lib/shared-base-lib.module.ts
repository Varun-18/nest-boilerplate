import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CqrsMediator } from './cqrs/cqrs-mediator.service';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    CqrsModule,
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
                  ignore: 'pid,hostname',
                },
              }
            : undefined,
        autoLogging: false,
      },
      forRoutes: [],
    }),
  ],
  providers: [CqrsMediator],
  exports: [CqrsMediator, LoggerModule],
})
export class SharedBaseLibModule {}
