import { ClienteDetalle } from "./cliente";
import { EstadoOrden } from "./estadoOrden";
import { ProductoOrden } from "./productoOrden";
import { ResumenOrden } from "./resumenOrden";
import { VendedorDetalle } from "./vendedor";

export class Orden {
  idOrden: string;
  numeroOrden: string;
  clienteDetalle: ClienteDetalle;
  vendedorDetalle: VendedorDetalle;
  resumenOrden: ResumenOrden;
  estadoOrden: EstadoOrden;
  productosOrden: ProductoOrden[];


  public constructor(idOrden: string,
     numeroOrden: string,
     clienteDetalle: ClienteDetalle,
     vendedorDetalle: VendedorDetalle,
     resumenOrden: ResumenOrden,
     estadoOrden: EstadoOrden,
     productosOrden: ProductoOrden[]) {

    this.idOrden = idOrden;
    this.numeroOrden = numeroOrden;
    this.clienteDetalle = clienteDetalle;
    this.vendedorDetalle = vendedorDetalle;
    this.resumenOrden = resumenOrden;
    this.estadoOrden = estadoOrden;
    this.productosOrden = productosOrden;

  }
}
