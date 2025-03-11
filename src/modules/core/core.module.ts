import { Global, Module } from '@nestjs/common';
import { RabbitmqModule } from 'src/modules/core/rabbitmq/rabbitmq.module';
import { RedisModule } from './redis/redis.module';

@Global()
@Module({
  imports: [RabbitmqModule, RedisModule],
  exports: [RabbitmqModule, RedisModule],
})
export class CoreModule {}
