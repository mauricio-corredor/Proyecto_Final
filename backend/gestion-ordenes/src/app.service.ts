/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { AppDto } from './app.dto';
import { AppEntity } from './app.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(AppEntity)
    private readonly appRepository: Repository<AppEntity>,
    private readonly sqsService: SqsService,
  ) {}
  async findAll(): Promise<AppEntity[]> {
    return await this.appRepository.find();
  }

  async findOne(paisInventario: string, idOrden: string): Promise<AppEntity> {
    return await this.appRepository.findOne({
      where: {
        paisInventario: paisInventario,
        idOrden: idOrden,
      },
    });
  }
  async findByCountry(paisInventario: string): Promise<AppEntity[]> {
    return await this.appRepository.find({
      where: { paisInventario: paisInventario },
    });
  }

  async create(appDto: AppDto): Promise<AppEntity> {
    const estadoOrden = 'PROCESADA';
    appDto.paisInventario = appDto.vendedorDetalle['pais'];
    let index: any;
    for (index in appDto.productosOrden) {
      const producto = appDto.productosOrden[index];
      this.logger.log(`create producto: ${JSON.stringify(producto)}`);
      await this.sendMessage(appDto.paisInventario, producto);
    }
    appDto.estadoOrden = estadoOrden;
    const appEntity: AppEntity = plainToInstance(AppEntity, appDto);
    return await this.appRepository.save(appEntity);
  }

  async sendMessage(paisInventario: string, body: object): Promise<any> {
    const key = `${paisInventario}_${body['idProducto']}`;
    this.logger.log(`sendMessage key: ${key}`);
    const data = {
      idProducto: body['idProducto'],
      paisInventario: paisInventario,
      cantidadTotal: body['cantidadVendida'],
    };
    try {
      await this.sqsService.send('InventarioCola', {
        id: key,
        body: data,
        messageAttributes: {},
        delaySeconds: 0,
      });
      this.logger.log(`sendMessage id: ${key}`);
      this.logger.log(`sendMessage data: ${JSON.stringify(data)}`);
      return { message: 'Message send to queue' };
    } catch (er) {
      this.logger.log(er);
      this.logger.log(`sendNotMessage id: ${key}`);
      return { message: 'error, dont send message' };
    }
  }

  async findOrden(idOrden: string): Promise<AppEntity> {

    return await this.appRepository.findOne({
      where: { idOrden: idOrden },
    });
  }


}
