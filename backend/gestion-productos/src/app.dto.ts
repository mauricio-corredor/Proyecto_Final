import { IsNotEmpty, IsPositive, IsString, IsUrl } from 'class-validator';

export class AppDto {
  @IsString()
  @IsNotEmpty()
  readonly descripcionProducto: string;
  @IsUrl()
  @IsNotEmpty()
  readonly imagenProducto: string;
  @IsString()
  @IsNotEmpty()
  readonly proveedor: string;
  @IsString()
  @IsNotEmpty()
  readonly fabricanteProducto: string;
  @IsString()
  @IsNotEmpty()
  readonly volumenProducto: string;
  @IsString()
  @IsNotEmpty()
  readonly tipoProducto: string;
  @IsString()
  @IsNotEmpty()
  readonly fechaVencimiento: string;
  @IsString()
  @IsNotEmpty()
  readonly codigoProducto: string;
  @IsString()
  @IsNotEmpty()  
  @IsPositive()
  readonly precioProducto: number;
}
