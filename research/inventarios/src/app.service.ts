import {CACHE_MANAGER, Inject, Injectable, Logger} from '@nestjs/common';
import { Cache } from 'cache-manager';
import {InjectRepository} from "@nestjs/typeorm";
import {AppEntity} from "./app.entity";
import {Repository} from "typeorm";
import { Cron } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule/dist';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { plainToInstance } from 'class-transformer';
import {type} from "os";

@Injectable()
export class AppService {
  response_default = {
    productId: '',
    countryCode: ''
  }
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(AppEntity)
    private readonly appRepository: Repository<AppEntity>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}
  async findOne(countryCode: string, productId: string): Promise<any> {
    let key = `${countryCode}_${productId}`
    try{
      this.logger.log(`findOne id: ${key}`);
      const val = await this.cacheManager.get(key)
      this.logger.log(`findOne data: ${val}`);
      return {
        data: val,
        from: 'cache'
      }
    }
    catch (er) {
      this.logger.log(`findOne id: ${key}`);
      this.logger.log(er);
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
  handleMessage(message: AWS.SQS.Message){
    try{
      const appEntity = new AppEntity();
      let body = JSON.parse(message.Body);
      this.logger.log(`body: ${body}`);
      appEntity.productId = body["productId"]
      appEntity.countryCode = body["countryCode"]
      appEntity.count = body["count"]
      appEntity.productName = "product"
      appEntity.productDescription = "prueba"
      let key = `${appEntity.countryCode}_${appEntity.productId}`
      this.logger.log(`handleMessage key: ${key}`)
      this.appRepository.save(appEntity)
      this.logger.log(`handleMessage save db body: ${JSON.stringify(appEntity)}`)
      this.cacheManager.set(key, JSON.stringify(appEntity), 9000000000000000)
      this.logger.log(`handleMessage save cache body: ${JSON.stringify(appEntity)}`)
    }
    catch(er){
      this.logger.log("queue not found");
    }
  }
}
