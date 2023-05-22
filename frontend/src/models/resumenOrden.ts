export class ResumenOrden {
  subtotal: number;
  impuestos:number;
  total: number;

constructor(
  subtotal: number,
  impuestos: number,
  total: number
) {

  this.subtotal = subtotal;
  this.impuestos = impuestos;
  this.total = total;

  }
}
