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
    const url = `${process.env.urlProductos}/${paisInventario}/${idProducto}`;
    const producto = this.appService.getResponseUrl(url);
    const inventario = this.appService.findOne(paisInventario, idProducto);
    producto['paisInventario'] = paisInventario;
    producto['cantidadTotal'] = inventario['cantidadTotal'];
    return producto;
  }
}
