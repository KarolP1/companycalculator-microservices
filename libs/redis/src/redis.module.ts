import { Logger, Module } from '@nestjs/common';
import { RedisConnectionService } from './redis.service';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => {
        const loger = new Logger('RedisModule');
        loger.log('RedisModule is initializing');
        return ({
          type: 'single',
          url: 'redis://localhost:6379',
          onClientReady: (client) => {
            console.log(client)
            loger.log('Redis client is ready');
          },
          onClientError: (error) => {
            loger.error('Redis client error', error);
          }
        })
      },
    }),

  ],
  providers: [RedisConnectionService],
  exports: [RedisConnectionService, RedisConnectionModule],
})
export class RedisConnectionModule { }
