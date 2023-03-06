import {CACHE_MANAGER, Inject, Injectable} from '@nestjs/common';
import { Cache } from 'cache-manager';
import {InjectRepository} from "@nestjs/typeorm";
import {AppEntity} from "./app.entity";
import {Repository} from "typeorm";

@Injectable()
export class AppService {
  response_default = {
    productId: '',
    country: '',
    count: 0
  }
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}
  async findOne(countryCode: string, productId: string): Promise<any> {
    let key = `${countryCode}_${productId}`
    const val = await this.cacheManager.get(key)
    if (val) {
      return {
        data: val,
        from: 'cache'
      }
    }
    else {
      let response = this.response_default
      response['productId'] = productId
      response['country'] = countryCode
      return {
        data: response,
        from: 'cache not found'
      }
    }
  }
}
