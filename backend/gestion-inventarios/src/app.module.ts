/* eslint-disable prettier/prettier */
import { HttpModule, HttpService } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppEntity } from './app.entity';
import { redisStore } from 'cache-manager-redis-yet';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqsModule } from '@ssut/nestjs-sqs';

import * as AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAWONOFRHV4HRWB3V2',
  secretAccessKey: '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',
});

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      store: redisStore,
      socket: {
        host: 'redis-inventarios.tqpsxa.ng.0001.use1.cache.amazonaws.com',
        port: 6379,
      },
    }),
    TypeOrmModule.forFeature([AppEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'proyecto.cco378ibyevv.us-east-1.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'proyecto',
      entities: [AppEntity],
      dropSchema: false,
      synchronize: true,
    }),
    SqsModule.register({
      consumers: [
        {
          name: 'InventarioCola',
          queueUrl: 'https://sqs.us-east-1.amazonaws.com/443283769835/InventarioCola',
          region: 'us-east-1',
        },
      ],
      producers: [],
    }),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'AXIOS_INSTANCE_TOKEN', 
      useExisting: HttpService,
    },],
})
export class AppModule {}
