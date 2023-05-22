export class NuevoUsuarioDto{
  nombre: string;
  nombreUsuario: string;
  password: string;
  constructor(nombre: string, nombreUsuario: string, password: string){
    this.nombre = nombre;
    this.nombreUsuario = nombreUsuario;
    this.password = password;
  }
}
