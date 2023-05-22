/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'ordenes'})
export class AppEntity {
  @PrimaryGeneratedColumn('uuid')
  idOrden: string;

  @Column()
  numeroOrden: string;

  @Column()
  paisInventario: string;

  @Column({ type: 'jsonb' })
  clienteDetalle: Array<string>;

  @Column({ type: 'jsonb' })
  vendedorDetalle: Array<string>;

  @Column({ type: 'jsonb' })
  resumenOrden: Array<string>;

  @Column()
  estadoOrden: string;

  @Column({ type: 'jsonb' })
  productosOrden: Array<string>[];
}
