export class ProductoOrden {
    idProducto: string;
    codigoproducto: string;
    descripcionProducto:string;
    cantidadVendida: number;
    precioProducto: number;
    valorTotal: number;

  constructor(idProducto: string, codigoproducto: string, descripcionProducto:string,
    cantidadVendida: number, precioProducto: number, valorTotal: number) {

    this.idProducto = idProducto;
    this.codigoproducto = codigoproducto;
    this.descripcionProducto = descripcionProducto;
    this.cantidadVendida = cantidadVendida;
    this.precioProducto = precioProducto;
    this.valorTotal = valorTotal;
  }
}
