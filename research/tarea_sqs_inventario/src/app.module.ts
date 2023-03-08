/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SqsModule } from '@ssut/nestjs-sqs';
import { AppService } from './app.service';
import * as AWS from 'aws-sdk';


AWS.config.update({
  region: 'us-east-1', // aws region
  accessKeyId: 'AKIAWONOFRHV4HRWB3V2', // aws access key id
  secretAccessKey: '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', // aws secret access key
});


@Module({
  imports: [
    ScheduleModule.forRoot(),
    SqsModule.register({
      consumers: [
                  {
                  name: "ColaInventario", 
                  queueUrl: "https://sqs.us-east-1.amazonaws.com/443283769835/ColaInventario", 
                  region: 'us-east-1', // url of the queue
                  },
                ],
      producers: [],
    }),
  ],
  providers: [AppService],
})
export class AppModule {}