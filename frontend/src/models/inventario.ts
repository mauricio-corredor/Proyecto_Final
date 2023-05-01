export class Inventario {
  id: string;
  idProducto:string;
  paisInventario:string;
  cantidadTotal: number;


constructor(id: string, idProducto:string, paisInventario:string, cantidadTotal: number) {

  this.id = id;
  this.idProducto = idProducto;
  this.paisInventario = paisInventario;
  this.cantidadTotal = cantidadTotal;
}
}
