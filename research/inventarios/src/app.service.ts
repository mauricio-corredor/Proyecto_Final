import {CACHE_MANAGER, Inject, Injectable, Logger} from '@nestjs/common';
import { Cache } from 'cache-manager';
import {InjectRepository} from "@nestjs/typeorm";
import {AppEntity} from "./app.entity";
import {Repository} from "typeorm";
import { Cron } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule/dist';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import {AppDto} from "./app.dto";

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
  async findOne(countryCode: string, productId: string): Promise<Object> {
    let key = `${countryCode}_${productId}`
    try{
      this.logger.log(`findOne id: ${key}`);
      const val = await this.cacheManager.get(key)
      this.logger.log(`findOne data: ${JSON.stringify(val)}`);
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

  async updateEntity(productId: string, countryCode: string, count: number): Promise<AppEntity>{
    const appPersisted: AppEntity = await this.appRepository.findOne({where: {
        productId: productId, countryCode: countryCode
      }});
    this.logger.log(`updateEntity appPersisted: ${JSON.stringify(appPersisted)}`)
    const appEntity = new AppEntity()
    appEntity.productId = appPersisted.productId
    appEntity.countryCode =  appPersisted.countryCode
    appEntity.productName = appPersisted.productName
    appEntity.productDescription = appPersisted.productDescription
    appEntity.count = appPersisted.count - count
    this.logger.log(`updateEntity update value count: ${appEntity.count}`)
    await this.appRepository.save({...appPersisted, ...appEntity});
    this.logger.log(`updateEntity save db appEntity: ${JSON.stringify(appEntity)}`)
    return appEntity
  }

  async updateCache(key: string, appEntity: AppEntity){
    const appDto = {
      productId: appEntity.productId,
      productName: appEntity.productName,
      productDescription: appEntity.productDescription,
      count: appEntity.count,
      countryCode: appEntity.countryCode
    }
    await this.cacheManager.set(key, appDto, 9000000000000000)
    this.logger.log(`updateCache save cache appDto: ${JSON.stringify(appDto)}`)
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  @SqsMessageHandler(process.env.queue_name, false)
  async handleMessage(message: AWS.SQS.Message){
    try{
      let body = JSON.parse(message.Body);
      this.logger.log(`handleMessage body: ${JSON.stringify(body)}`);
      let productId = body["productId"]
      let countryCode = body["countryCode"]
      let count = body["count"]
      let key = `${countryCode}_${productId}`
      this.logger.log(`handleMessage key: ${key}`)
      const appEntity: AppEntity = await this.updateEntity(productId, countryCode, count)
      await this.updateCache(key, appEntity)
    }
    catch(er){
      this.logger.log("queue not found");
    }
  }

  async postCache(appDto: AppDto) {
    let key = `${appDto.countryCode}_${appDto.productId}`
    this.logger.log(`postCache key: ${key}`)
    const register = {
      id: appDto.id,
      productId: appDto.productId,
      countryCode: appDto.countryCode,
      count: appDto.count,
      productName: appDto.productName,
      productDescription: appDto.productDescription
    }
    await this.cacheManager.set(key, register, 909000)
    this.logger.log(`postCache save cache newApp: ${JSON.stringify(register)}`)

  }
}
