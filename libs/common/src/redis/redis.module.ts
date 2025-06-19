// import { Module } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache-manager';
// import * as redisStore from 'cache-manager-ioredis';
// import type { RedisClientOptions } from 'redis';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     ConfigModule,
//     CacheModule.registerAsync<RedisClientOptions>({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         store: redisStore,
//         host: configService.get('REDIS_HOST'),
//         port: configService.get('REDIS_PORT', 6379),
//         ttl: 60,
//       }),
//       isGlobal: true,
//     }),
//   ],
//   exports: [CacheModule],
// })
// export class RedisCacheModule {}

// redis-cache.module.ts
// import {  Global, Module } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache-manager';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import * as redisStore from 'cache-manager-ioredis'; // ✅ this must be used
// import { RedisClientOptions } from 'redis';

// @Global()
// @Module({
//   imports: [
//     ConfigModule,
//     CacheModule.registerAsync<RedisClientOptions>({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         store: redisStore, // ✅ must use this line
//         host: configService.get('REDIS_HOST'),
//         port: configService.get<number>('REDIS_PORT', 6379),
//         ttl: 60, // default TTL
//       }),
//     }),
//   ],
//   exports: [CacheModule],
// })
// export class RedisCacheModule {}



// libs/common/src/redis/redis.module.ts
// import { Module, Global } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache-manager';
// import * as redisStore from 'cache-manager-ioredis';


// @Global()
// @Module({
//   imports: [
//     CacheModule.registerAsync({
//       useFactory: async () => ({
//         store: redisStore,
//         host: 'redis', // If using Docker, match service name in docker-compose
//         port: 6379,
//         ttl: 60,
//       }),
//     }),
//   ],
//   exports: [CacheModule],
// })
// export class RedisCacheModule {  constructor() {
//     console.log('✅ RedisCacheModule initialized');
//   }}

// import { CacheModule } from '@nestjs/cache-manager';
// import { Module } from '@nestjs/common';
// import * as redisStore from 'cache-manager-ioredis';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import type { RedisClientOptions } from 'redis';

// @Module({
//   imports: [
//     ConfigModule,
//     CacheModule.registerAsync<RedisClientOptions>({
//       isGlobal: true,
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         store: redisStore,
//         host: configService.get<string>('REDIS_HOST', 'localhost'),
//         port: configService.get<number>('REDIS_PORT', 6379),
//         ttl: 60,
//       }),
//     }),
//   ],
//   exports: [CacheModule],
// })
// export class RedisCacheModule {}


// import { CacheModule } from '@nestjs/cache-manager';
// import { Global, Module } from '@nestjs/common';
// import * as redisStore from 'cache-manager-ioredis';

// @Global() 
// @Module({
//   imports: [
//     CacheModule.registerAsync({
//       useFactory: async () => ({
//         store: redisStore,
//         host: 'redis', // match this to your docker-compose service name
//         port: 6379,
//         ttl: 60, // cache TTL in seconds
//       }),
//     }),
//   ],
//   exports: [CacheModule],
// })
// export class RedisCacheModule {  constructor() {
//     console.log('✅ RedisCacheModule initialized');
//   }}



// import { Module, Global } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache-manager';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import * as redisStore from 'cache-manager-ioredis';
// import type { RedisClientOptions } from 'redis';

// @Global()
// @Module({
//   imports: [
//     ConfigModule,
//     CacheModule.registerAsync<RedisClientOptions>({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => {
//         const options = {
//           store: redisStore,
//           host: configService.get<string>('REDIS_HOST', 'redis'),
//           port: configService.get<number>('REDIS_PORT', 6379),
//           ttl: 60,
//           retryStrategy: (times: number) => Math.min(times * 50, 2000),
//         };
//         console.log('Redis connection options:', options);
//         return options;
//       },
//     }),
//   ],
//   exports: [CacheModule],
// })
// export class RedisCacheModule {
//   constructor() {
//     console.log('✅ RedisCacheModule initialized');
//   }
// }
 

// import { Module, Global } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache-manager';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import * as redisStore from 'cache-manager-ioredis';
// import type { RedisClientOptions } from 'redis';

// @Global()
// @Module({
//   imports: [
//     ConfigModule,
//     CacheModule.registerAsync<RedisClientOptions>({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//    useFactory: async (configService: ConfigService) => {
//   const options = {
//     store: redisStore,
//     host: configService.get<string>('REDIS_HOST', 'redis'),
//     port: configService.get<number>('REDIS_PORT', 6379),
//     ttl: 60,
//     max: 100,
//     min: 10,
//     retryStrategy: (times: number) => Math.min(times * 50, 2000),
//   };
//   console.log('Connecting to Redis with options:', options);
//   return options;
// },
//     }),
//   ],
//   exports: [CacheModule],
// })
// export class RedisCacheModule {
//   constructor() {
//     console.log('✅ RedisCacheModule initialized');
//   }
// }


import { Module, Global } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-ioredis';
import type { RedisClientOptions } from 'redis';

@Global()
@Module({
  imports: [
    ConfigModule,
    CacheModule.registerAsync<RedisClientOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const options = {
          store: redisStore,
          host: configService.get<string>('REDIS_HOST', 'redis'),
          port: configService.get<number>('REDIS_PORT', 6379),
          ttl: 60,
          max: 10,
          min: 1,
          retryStrategy: (times: number) => {
            console.log(`Redis retry attempt: ${times}`);
            return Math.min(times * 50, 2000);
          },
          reconnectOnError: (err: Error) => {
            console.error('Redis connection error:', err.message);
            return true;
          },
        };
        console.log('Redis connection options:', options);
        return options;
      },
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {
  constructor() {
    console.log('✅ RedisCacheModule initialized');
  }
}