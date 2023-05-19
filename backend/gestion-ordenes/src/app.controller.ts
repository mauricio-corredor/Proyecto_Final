import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppDto } from './app.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  async get() {
    return 'ok';
  }

  @Get('ordenes')
  async findAll() {
    return this.appService.findAll();
  }

  @Get('ordenes/:paisInventario/:idOrden')
  async findOne(
    @Param('paisInventario') paisInventario: string,
    @Param('idOrden') idOrden: string,
  ) {
    return await this.appService.findOne(paisInventario, idOrden);
  }

  @Get('ordenes/:paisInventario')
  async findByCountry(@Param('paisInventario') paisInventario: string) {
    return await this.appService.findByCountry(paisInventario);
  }

  @Post('ordenes')
  async create(@Body() appDto: AppDto) {
    return await this.appService.create(appDto);
  }
}
