export class Inventario {
  id: string;
  idProducto:string;
  paisInventario:string;
  cantidadTotal: number;
  descripcionProducto:string;
  imagenProducto:string;
  proveedor: string;
  fabricanteProducto: string;
  volumenProducto: string;
  tipoProducto: string;
  fechaVencimiento: string;
  codigoProducto: string;
  precioProducto: number;



constructor(id: string,
  idProducto: string,
  paisInventario: string,
  cantidadTotal: number,
  descripcionProducto: string,
  imagenProducto: string,
  proveedor: string,
  fabricanteProducto: string,
  volumenProducto: string,
  tipoProducto: string,
  fechaVencimiento: string,
  codigoProducto: string,
  precioProducto: number) {

  this.id = id;
  this.idProducto = idProducto;
  this.paisInventario = paisInventario;
  this.cantidadTotal = cantidadTotal;
  this.descripcionProducto = descripcionProducto;
  this.imagenProducto = imagenProducto;
  this.proveedor = proveedor;
  this.fabricanteProducto = fabricanteProducto;
  this.volumenProducto = volumenProducto;
  this.tipoProducto = tipoProducto;
  this.fechaVencimiento = fechaVencimiento;
  this.codigoProducto = codigoProducto;
  this.precioProducto = precioProducto;

  }
}
