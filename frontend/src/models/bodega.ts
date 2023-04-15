export class Bodega {
    idBodega: string;
    nombreBodega:string;
    ubicacionPais:string;
    ubicacionCiudad: string;
    zonaLocalizacion: string;
    capacidadVolumen: string;
    capacidadUsada: string;
    capacidadDisponible: string;


  constructor(idBodega: string, nombreBodega:string, ubicacionPais:string, ubicacionCiudad: string,
    zonaLocalizacion: string, capacidadVolumen: string, capacidadUsada: string, capacidadDisponible: string) {

    this.idBodega = idBodega;
    this.nombreBodega = nombreBodega;
    this.ubicacionPais = ubicacionPais;
    this.ubicacionCiudad = ubicacionCiudad;
    this.zonaLocalizacion = zonaLocalizacion;
    this.capacidadVolumen = capacidadVolumen;
    this.capacidadUsada = capacidadUsada;
    this.capacidadDisponible = capacidadDisponible;

  }
}
