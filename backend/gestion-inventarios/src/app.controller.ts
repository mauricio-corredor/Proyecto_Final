import { Controller, Get, Logger, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}
  @Get('health')
  async get() {
    await this.appService.replyDataBase();
    return 'ok';
  }
  @Get('inventarios/:paisInventario/:idProducto')
  async findOne(
    @Param('paisInventario') paisInventario: string,
    @Param('idProducto') idProducto: string,
  ) {
    const url = `${process.env.urlProductos}/${idProducto}`;
    const producto = await this.appService.getResponseUrl(url);
    this.logger.log(`findOne producto: ${JSON.stringify(producto)}`);
    const inventario = await this.appService.findOne(
      paisInventario,
      idProducto,
    );
    this.logger.log(`findOne inventario: ${JSON.stringify(inventario)}`);
    producto['paisInventario'] = paisInventario;
    producto['cantidadTotal'] = inventario['data']['cantidadTotal'];
    return producto;
  }
  @Get('inventarios/:paisInventario')
  async findByCountry(@Param('paisInventario') paisInventario: string) {
    const productos: any[] = [];
    const inventarios = await this.appService.findByCountry(paisInventario);
    this.logger.log(
      `findByCountry inventarios: ${JSON.stringify(inventarios)}`,
    );
    let index: any;
    let inventario: any;
    let producto: any;
    for (index in inventarios) {
      inventario = inventarios[index];
      producto = await this.findOne(
        inventario['paisInventario'],
        inventario['idProducto'],
      );
      productos.push(producto);
    }
    return productos;
  }
  @Get('inventarios')
  async findAll() {
    const productos: any[] = [];
    const inventarios = await this.appService.findAll();
/*    this.logger.log(
      `findByCountry inventarios: ${JSON.stringify(inventarios)}`,
    );
    let index: any;
    let inventario: any;
    let producto: any;
    for (index in inventarios) {
      inventario = inventarios[index];
      producto = await this.findOne(
        inventario['paisInventario'],
        inventario['idProducto'],
      );
      productos.push(producto);
    }*/
    return inventarios;
  }
}
