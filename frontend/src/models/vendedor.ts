export class VendedorDetalle {
  [x: string]: any;
  pais: string;
  nombre: string;

  constructor(
    pais: string,
    nombre: string
  ) {

  this.pais = pais;
  this.nombre = nombre;
  }
}
