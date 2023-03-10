/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SqsModule} from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
