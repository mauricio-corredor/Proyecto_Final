/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsArray, IsJSON } from 'class-validator';

export class AppDto {
  @IsString()
  @IsNotEmpty()
  readonly numeroOrden: string;

  @IsString()
  public paisInventario: string;

  @IsJSON()
  @IsNotEmpty()
  readonly clienteDetalle: object;

  @IsJSON()
  @IsNotEmpty()
  readonly vendedorDetalle: object;

  @IsJSON()
  @IsNotEmpty()
  readonly resumenOrden: object;

  @IsString()
  public estadoOrden: string;

  @IsArray()
  @IsNotEmpty()
  readonly productosOrden: object[];
}
