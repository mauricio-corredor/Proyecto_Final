import { TipoProducto } from "./tipoProducto1.enum";


export class Producto {
    idProducto: string;
    descripcionProducto:string;
    imagenProducto:string;
    proveedor: string;
    fabricanteProducto: string;
    volumenProducto: string;
    tipoProducto: string;
    fechaVencimiento: string;
    codigoProducto: string;
    precioProducto: number;


  constructor(idProducto: string, descripcionProducto:string, imagenProducto:string, proveedor: string,
    fabricanteProducto: string, volumenProducto: string, tipoProducto: string, fechaVencimiento: string,
    codigoProducto: string, precioProducto: number) {

    this.idProducto = idProducto;
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
