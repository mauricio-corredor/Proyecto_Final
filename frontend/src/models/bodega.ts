export class Bodega {
    idBodega: string;
    nombreBodega:string;
    ubicacionPais:string;
    ubicacionCiudad: string;
    zonaLocalizacion: string;
    capacidadVolumen: number;
    capacidadUsada: number;
    capacidadDisponible: number;


  constructor(idBodega: string, nombreBodega:string, ubicacionPais:string, ubicacionCiudad: string,
    zonaLocalizacion: string, capacidadVolumen: number, capacidadUsada: number, capacidadDisponible: number) {

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
