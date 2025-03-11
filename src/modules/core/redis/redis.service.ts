import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { configFn } from 'src/config';
import { TRedisKey } from 'src/modules/core/redis/redis.dto';

@Injectable()
export class RedisService implements OnModuleInit {
  private instance!: Redis;
  private readonly logger = new Logger(RedisService.name);

  async onModuleInit() {
    await this.initializeRedis();
  }

  async onModuleDestroy() {
    if (this.instance) {
      await this.instance.quit();
      this.logger.log('Redis connection closed');
    }
  }

  private async initializeRedis() {
    try {
      const {
        REDIS_PORT,
        REDIS_HOST,
        REDIS_USERNAME,
        REDIS_PASSWORD,
        REDIS_DB,
      } = configFn();
      this.instance = new Redis({
        port: parseInt(REDIS_PORT!),
        host: REDIS_HOST,
        username: REDIS_USERNAME,
        password: REDIS_PASSWORD,
        db: parseInt(REDIS_DB!),
        keepAlive: 60_000,
        retryStrategy: (times) => {
          const delay = Math.pow(2, times) * 1000;
          this.logger.warn(
            `Reconnecting to Redis in ${delay / 1000} seconds...`,
          );
          return delay;
        },
      });

      await new Promise<void>((resolve, reject) => {
        this.instance.on('ready', () => {
          this.logger.log('Redis connection initialized');
          resolve();
        });

        this.instance.on('error', (error) => {
          this.logger.error('Redis General Error:', error.stack);
          reject(error);
        });
      });
    } catch (error) {
      this.logger.error('Error Initializing Redis:', (<Error>error).stack);
    }
  }

  getInstance(): Redis {
    return this.instance;
  }

  async get(reqKey: TRedisKey, identifier: string): Promise<any> {
    try {
      const key = `${reqKey}/${identifier}`;
      const data = await this.instance.get(key);

      if (!data) {
        return null;
      }

      return JSON.parse(data);
    } catch (error) {
      this.logger.error(
        'Failed to retrieve data from Redis:',
        (error as Error).stack,
      );
      throw new Error('Failed to retrieve data from Redis');
    }
  }
}
