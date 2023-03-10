import {CACHE_MANAGER, Inject, Injectable, Logger} from '@nestjs/common';
import { Cache } from 'cache-manager';
import {InjectRepository} from "@nestjs/typeorm";
import {AppEntity} from "./app.entity";
import {Repository} from "typeorm";
import { Cron } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule/dist';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';

@Injectable()
export class AppService {
  response_default = {
    productId: '',
    countryCode: ''
  }
  private readonly logger = new Logger(AppService.name);
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}
  async findOne(countryCode: string, productId: string): Promise<any> {
    let key = `${countryCode}_${productId}`
    try{
    const val = await this.cacheManager.get(key)
      return {
        data: val,
        from: 'cache'
      }
    }
    catch (er) {
      let response = this.response_default
      response['productId'] = productId
      response['country'] = countryCode
      return {
        data: response,
        from: 'cache not found. Try again in few minutes'
      }
    }
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  @SqsMessageHandler(process.env.queue_name, false)
  async handleMessage(message: AWS.SQS.Message){
    try{
      const body: any = message.Body;
      console.log(`body: ${body}`);
    }
    catch(er){
      console.log("queue not found");
    }
  }
}
