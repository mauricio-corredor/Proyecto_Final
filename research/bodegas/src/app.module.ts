/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SqsModule} from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { AppController } from './app.controller';
import { AppService } from './app.service';

AWS.config.update({
  region: 'us-east-1', // aws region
  accessKeyId: 'AKIAWONOFRHV4HRWB3V2', // aws access key id
  secretAccessKey: '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', // aws secret access key
});

@Module({
  imports: [
    SqsModule.register({
      consumers: [],
      producers: [
          {
              name: "ColaInventario", 
              queueUrl: "https://sqs.us-east-1.amazonaws.com/443283769835/ColaInventario", 
              region: 'us-east-1', // url of the queue
          },
      ],
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
