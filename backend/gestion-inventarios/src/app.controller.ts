import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('inventarios/:paisInventario/:idProducto')
  findOne(
    @Param('paisInventario') paisInventario: string,
    @Param('idProducto') idProducto: string,
  ) {
    return this.appService.findOne(paisInventario, idProducto);
  }
}
