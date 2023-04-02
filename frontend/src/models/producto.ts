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


  constructor(idProducto: string, descripcionProducto:string, imagenProducto:string, proveedor: string,
    fabricanteProducto: string, volumenProducto: string, tipoProducto: string, fechaVencimiento: string) {

    this.idProducto = idProducto;
    this.descripcionProducto = descripcionProducto;
    this.imagenProducto = imagenProducto;
    this.proveedor = proveedor;
    this.fabricanteProducto = fabricanteProducto;
    this.volumenProducto = volumenProducto;
    this.tipoProducto = tipoProducto;
    this.fechaVencimiento = fechaVencimiento;

  }
}
