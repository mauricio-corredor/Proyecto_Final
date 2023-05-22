/* eslint-disable prettier/prettier */
import { Controller, Get, Logger, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AppService } from './app.service';

@Controller('inventarios')
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    private readonly appService: AppService,
    private httpService: HttpService,
    ) {}

    @Get('health')
    async get() {      
      return 'ok';
    }

  @Get(':paisInventario/:idProducto')
  async findOne(
    @Param('paisInventario') paisInventario: string,
    @Param('idProducto') idProducto: string,
  ) {
    const url = `http://LB-app-bodega-2115956073.us-east-1.elb.amazonaws.com:81/productos/${idProducto}`;
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

  @Get(':paisInventario')
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

  @Get()
  async findAllProducts() {
    const inventario = await this.appService.getAllProductosInventario();
    const productos = await this.httpService
      .get('http://LB-app-bodega-2115956073.us-east-1.elb.amazonaws.com:81/productos')
      .toPromise();

    const productosInventario = inventario.map((productoInventario) => {
      const productoDetalle = productos.data.find(
        (productoMicroservicio) =>
          productoMicroservicio.idProducto === productoInventario.idProducto,
      );

      return {
        ...productoInventario,
        descripcionProducto: productoDetalle.descripcionProducto,
        imagenProducto: productoDetalle.imagenProducto,
        proveedor: productoDetalle.proveedor,
        fabricanteProducto: productoDetalle.fabricanteProducto,
        volumenProducto: productoDetalle.volumenProducto,
        tipoProducto: productoDetalle.tipoProducto,
        fechaVencimiento: productoDetalle.fechaVencimiento,
        codigoProducto: productoDetalle.codigoProducto,
        precioProducto: productoDetalle.precioProducto,

      };
    });
    return productosInventario;
  }
  
}
