import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppEntity } from './app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AppEntity)
    private readonly appRepository: Repository<AppEntity>,
  ) {}

  async findAll(): Promise<AppEntity[]> {
    return await this.appRepository.find();
  }

  async findOne(id: string): Promise<AppEntity> {
    return await this.appRepository.findOne({
      where: { idProducto: id },
    });
  }

  async create(appEntity: AppEntity): Promise<AppEntity> {
    return await this.appRepository.save(appEntity);
  }

  async update(id: string, newAppEntity: AppEntity): Promise<AppEntity> {
    const appEntity: AppEntity = await this.appRepository.findOne({
      where: { idProducto: id },
    });
    return await this.appRepository.save({
      ...appEntity,
      newAppEntity,
    });
  }

  async delete(id: string) {
    const appEntity: AppEntity = await this.appRepository.findOne({
      where: { idProducto: id },
    });
    await this.appRepository.remove(appEntity);
  }
}
