export class ClienteDetalle {
  [x: string]: any;
  nombre: string;
  Direccion:string;
  telefono: string;

constructor(
  nombre: string,
  Direccion: string,
  telefono: string
) {

  this.nombre = nombre;
  this.Direccion = Direccion;
  this.telefono = telefono;
  }
}
