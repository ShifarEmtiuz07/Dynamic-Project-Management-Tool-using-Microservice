// // import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';;
// // //import * as redisStore from 'cache-manager-redis-store';
// // import { redisStore } from 'cache-manager-redis-yet';
// // import { ConfigService } from '@nestjs/config';

// // export class RedisConfig implements CacheOptionsFactory {
// //   constructor(private configService: ConfigService) {}

// //   createCacheOptions(): CacheModuleOptions {
// //     return {
// //       store: redisStore,
// //       host: this.configService.get<string>('REDIS_HOST'),
// //       port: this.configService.get<number>('REDIS_PORT', 6379),
// //       ttl: this.configService.get<number>('REDIS_TTL', 60), // Cache TTL in seconds
// //     };
// //   }
// // }

// import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
// import { ConfigService } from '@nestjs/config';
// //import * as redisStore from 'cache-manager-ioredis';
// import { redisStore } from 'cache-manager-redis-yet';

// export class RedisConfig implements CacheOptionsFactory {
//   constructor(private configService: ConfigService) {}

//   createCacheOptions(): CacheModuleOptions {
//     return {
//       store: redisStore,
//       url: `redis://${this.configService.get<string>('REDIS_HOST')}:${this.configService.get<number>('REDIS_PORT', 6379)}`,
//       ttl: this.configService.get<number>('REDIS_TTL', 60) * 1000, // milliseconds
//     };
//   }
// }