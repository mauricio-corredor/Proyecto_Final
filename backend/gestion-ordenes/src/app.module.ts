/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SqsModule} from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AppEntity} from "./app.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

AWS.config.update({
  region: process.env.aws_region,
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
});

@Module({
  imports: [
    SqsModule.register({
      consumers: [],
      producers: [
          {
              name: process.env.queue_name,
              queueUrl: process.env.queue_url,
              region: process.env.aws_region
          },
      ],
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
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
