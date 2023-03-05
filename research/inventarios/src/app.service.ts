import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {AppEntity} from "./app.entity";
import {Repository} from "typeorm";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AppEntity)
    private readonly appRepository: Repository<AppEntity>
  ) {}
  async findOne(productId: string): Promise<AppEntity> {
    return await this.appRepository.findOne({where: {productId}});
  }
}
