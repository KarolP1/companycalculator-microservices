import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisConnectionService {
    private readonly logger = new Logger(RedisConnectionService.name);

    constructor(
        @InjectRedis() private readonly redis: Redis,
    ) { }

    async get(key: string): Promise<string | null> {
        try {
            return await this.redis.get(key);
        } catch (err) {
            this.logger.error(`GET failed for key: ${key}`, err);
            return null;
        }
    }

    async set(key: string, value: string): Promise<boolean> {
        try {
            await this.redis.set(key, value);
            return true;
        } catch (err) {
            this.logger.error(`SET failed for key: ${key}`, err);
            return false;
        }
    }

    async del(key: string): Promise<boolean> {
        try {
            await this.redis.del(key);
            return true;
        } catch (err) {
            this.logger.error(`DEL failed for key: ${key}`, err);
            return false;
        }
    }

    async exists(key: string): Promise<boolean> {
        try {
            const exists = await this.redis.exists(key);
            return exists === 1;
        } catch (err) {
            this.logger.error(`EXISTS check failed for key: ${key}`, err);
            return false;
        }
    }

    async expire(key: string, seconds: number): Promise<boolean> {
        try {
            await this.redis.expire(key, seconds);
            return true;
        } catch (err) {
            this.logger.error(`EXPIRE failed for key: ${key}`, err);
            return false;
        }
    }

    async hset(key: string, field: string, value: string): Promise<boolean> {
        try {
            await this.redis.hset(key, field, value);
            return true;
        } catch (err) {
            this.logger.error(`HSET failed for ${key}:${field}`, err);
            return false;
        }
    }

    async hget(key: string, field: string): Promise<string | null> {
        try {
            return await this.redis.hget(key, field);
        } catch (err) {
            this.logger.error(`HGET failed for ${key}:${field}`, err);
            return null;
        }
    }

    async hdel(key: string, field: string): Promise<boolean> {
        try {
            await this.redis.hdel(key, field);
            return true;
        } catch (err) {
            this.logger.error(`HDEL failed for ${key}:${field}`, err);
            return false;
        }
    }
}