/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule/dist';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  @Cron(CronExpression.EVERY_5_SECONDS)
  @SqsMessageHandler("ColaInventario", false)
  async handleMessage(message: AWS.SQS.Message){
    try{
    const obj: any = message.Body;
    console.log(obj);
    }catch(ex){
      console.log("");
    }
  }
}
