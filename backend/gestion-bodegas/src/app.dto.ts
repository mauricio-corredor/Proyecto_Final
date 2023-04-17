import { IsNotEmpty, IsString, IsNumber, IsUrl } from 'class-validator';

export class AppDto {
  @IsString()
  @IsNotEmpty()
  readonly nombreBodega: string;
  @IsUrl()
  @IsNotEmpty()
  readonly ubicacionPais: string;
  @IsString()
  @IsNotEmpty()
  readonly ubicacionCiudad: string;
  @IsString()
  @IsNotEmpty()
  readonly zonaLocalizacion: string;
  @IsNumber()
  @IsNotEmpty()
  readonly capacidadVolumen: number;
  @IsNumber()
  @IsNotEmpty()
  readonly capacidadUsada: number;
  @IsNumber()
  @IsNotEmpty()
  readonly CapacidadDisponible: number;
}
