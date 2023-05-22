/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Logger } from '@nestjs/common';
import { AppDto } from './app.dto';
import { AppService } from './app.service';

@Controller('ordenes')
export class AppController {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly appService: AppService) {}

  @Get('health')
  async get() {
    return 'ok';
  }

  @Get()
  async findAll() {
    return this.appService.findAll();
  }

  @Get('pais/:paisInventario/orden/:idOrden')
  async findOne(
    @Param('paisInventario') paisInventario: string,
    @Param('idOrden') idOrden: string,
  ) {
    return await this.appService.findOne(paisInventario, idOrden);
  }

  @Get('pais/:paisInventario')
  async findByCountry(@Param('paisInventario') paisInventario: string) {
    return await this.appService.findByCountry(paisInventario);
  }

  @Post()
  async create(@Body() appDto: AppDto) {
    return await this.appService.create(appDto);
  }

  @Get('orden/:idOrden')
  async findOrden(@Param('idOrden') idOrden: string) {
    this.logger.log("idOrden ");
    return await this.appService.findOrden(idOrden);
  }

}
