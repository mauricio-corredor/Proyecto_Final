import {CacheModule, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AppEntity} from "./app.entity";
import {RedisClientOptions} from "redis";
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: 'redisStore',
      host: process.env.redis_host || 'localhost',
      port: process.env.redis_port || 6379,
    }),
    TypeOrmModule.forFeature([AppEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.db_postgres_host || 'localhost',
      port: 5432,
      username: process.env.db_postgres_user || 'postgres',
      password: process.env.db_postgres_password || 'postgres',
      schema: process.env.db_postgres_schema || 'public',
      database: process.env.db_postgres_db || 'postgres',
      entities: [AppEntity],
      dropSchema: false,
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
