import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppEntity } from './app.entity';
import { redisStore } from 'cache-manager-redis-yet';
import { SqsModule } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { HttpModule } from '@nestjs/axios';

AWS.config.update({
  region: process.env.aws_region,
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
});

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      store: redisStore,
      socket: {
        host: process.env.redis_host || 'localhost',
        port: process.env.redis_port || 6379,
      },
    }),
    TypeOrmModule.forFeature([AppEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.db_postgres_host || 'localhost',
      port: 5432,
      username: process.env.db_postgres_user || 'postgres',
      password: process.env.db_postgres_password || 'postgres',
      database: process.env.db_postgres_db || 'postgres',
      entities: [AppEntity],
      dropSchema: false,
      synchronize: true,
    }),
    SqsModule.register({
      consumers: [
        {
          name: process.env.queue_name,
          queueUrl: process.env.queue_url,
          region: process.env.aws_region,
        },
      ],
      producers: [],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
