/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { plainToInstance } from 'class-transformer';
import { AppDto } from './app.dto';
import { AppEntity } from './app.entity';

@Controller('bodegas')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('health')
  async get(){
    return 'RPTA OK';
  }

  @Get()
  @Header('Access-Control-Allow-Origin', '*') // Or, specify specific origins
  async findAll() {
    return this.appService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.appService.findOne(id);
  }

  @Post()
  async create(@Body() appDto: AppDto) {
    const appEntity: AppEntity = plainToInstance(AppEntity, appDto);
    return await this.appService.create(appEntity);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() appDto: AppDto) {
    const appEntity: AppEntity = plainToInstance(AppEntity, appDto);
    return await this.appService.update(id, appEntity);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.appService.delete(id);
  }
}
