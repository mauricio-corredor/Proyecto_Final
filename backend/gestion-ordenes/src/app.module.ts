/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SqsModule} from '@ssut/nestjs-sqs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AppEntity} from "./app.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

import * as AWS from 'aws-sdk';


AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAWONOFRHV4HRWB3V2',
  secretAccessKey: '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',
});

@Module({
  imports: [
    SqsModule.register({
      consumers: [],
      producers: [
          {
              name: 'InventarioCola',
              queueUrl: 'https://sqs.us-east-1.amazonaws.com/443283769835/InventarioCola',
              region: 'us-east-1',
          },
      ],
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
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
