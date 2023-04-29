import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { AppEntity } from './app.entity';
import { Repository } from 'typeorm';
import { Cron } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule/dist';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';

@Injectable()
export class AppService {
  response_default = {
    idProducto: '',
    paisInventario: '',
  };
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(AppEntity)
    private readonly appRepository: Repository<AppEntity>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}
  async findOne(paisInventario: string, idProducto: string): Promise<any> {
    const key = `${paisInventario}_${idProducto}`;
    try {
      this.logger.log(`findOne id: ${key}`);
      const val = await this.cacheManager.get(key);
      this.logger.log(`findOne data: ${JSON.stringify(val)}`);
      return {
        data: val,
        from: 'cache',
      };
    } catch (er) {
      this.logger.log(`findOne id: ${key}`);
      this.logger.log(er);
      const response = this.response_default;
      response['idProducto'] = idProducto;
      response['country'] = paisInventario;
      return {
        data: response,
        from: 'cache not found. Try again in few minutes',
      };
    }
  }

  async updateEntity(
    idProducto: string,
    paisInventario: string,
    cantidadTotal: number,
  ): Promise<AppEntity> {
    const appPersisted: AppEntity = await this.appRepository.findOne({
      where: {
        idProducto: idProducto,
        paisInventario: paisInventario,
      },
    });
    this.logger.log(
      `updateEntity appPersisted: ${JSON.stringify(appPersisted)}`,
    );
    const appEntity = new AppEntity();
    appEntity.idProducto = appPersisted.idProducto;
    appEntity.paisInventario = appPersisted.paisInventario;
    appEntity.cantidadTotal = appPersisted.cantidadTotal - cantidadTotal;
    this.logger.log(
      `updateEntity update value cantidadTotal: ${appEntity.cantidadTotal}`,
    );
    await this.appRepository.save({ ...appPersisted, ...appEntity });
    this.logger.log(
      `updateEntity save db appEntity: ${JSON.stringify(appEntity)}`,
    );
    return appEntity;
  }

  async updateCache(key: string, appEntity: AppEntity) {
    const appDto = {
      idProducto: appEntity.idProducto,
      cantidadTotal: appEntity.cantidadTotal,
      paisInventario: appEntity.paisInventario,
    };
    await this.cacheManager.set(key, appDto, 9000000000000000);
    this.logger.log(`updateCache save cache appDto: ${JSON.stringify(appDto)}`);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  @SqsMessageHandler(process.env.queue_name, false)
  async handleMessage(message: AWS.SQS.Message) {
    try {
      const body = JSON.parse(message.Body);
      this.logger.log(`handleMessage body: ${JSON.stringify(body)}`);
      const idProducto = body['idProducto'];
      const paisInventario = body['paisInventario'];
      const cantidadTotal = body['cantidadTotal'];
      const key = `${paisInventario}_${idProducto}`;
      this.logger.log(`handleMessage key: ${key}`);
      const appEntity: AppEntity = await this.updateEntity(
        idProducto,
        paisInventario,
        cantidadTotal,
      );
      await this.updateCache(key, appEntity);
    } catch (er) {
      this.logger.log('queue not found');
    }
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async replyDataBase() {
    try {
      const productos = await this.appRepository.find();
      let producto: any;
      for (producto in productos) {
        this.logger.log(
          `replyDataBase idProducto: ${producto.idProducto}, paisInventario: ${producto.paisInventario}`,
        );
        const key = `${producto.paisInventario}_${producto.idProducto}`;
        await this.updateCache(key, producto);
      }
    } catch (er) {
      this.logger.log('DB not found');
    }
  }
}
