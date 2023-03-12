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

  async updateEntity(productId: string, countryCode: string, count: number): Promise<AppEntity> {
    const persistedApp: AppEntity = await this.appRepository.findOne({where: {
      productId: productId, countryCode: countryCode
      }});
    this.logger.log(`updateEntity persistedApp: ${JSON.stringify(persistedApp)}`)
    const appEntity = new AppEntity();
    appEntity.productId = productId
    appEntity.countryCode = countryCode
    appEntity.productName = persistedApp.productName
    appEntity.productDescription = persistedApp.productDescription
    appEntity.count = persistedApp.count - count
    this.logger.log(`updateEntity update value count: ${appEntity.count}`)
    await this.appRepository.save({...persistedApp, ...appEntity});
    this.logger.log(`updateEntity save db appEntity: ${JSON.stringify(appEntity)}`)
    return appEntity
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  @SqsMessageHandler(process.env.queue_name, false)
  handleMessage(message: AWS.SQS.Message){
    try{
      let body = JSON.parse(message.Body);
      this.logger.log(`handleMessage body: ${JSON.stringify(body)}`);
      let productId = body["productId"]
      let countryCode = body["countryCode"]
      let count = body["count"]
      let key = `${countryCode}_${productId}`
      this.logger.log(`handleMessage key: ${key}`)
      let appEntity = this.updateEntity(productId, countryCode, count)
      this.cacheManager.set(key, JSON.stringify(appEntity), 9000)
      this.logger.log(`handleMessage save cache body: ${JSON.stringify(appEntity)}`)
    }
    catch(er){
      this.logger.log("queue not found");
    }
  }
}
