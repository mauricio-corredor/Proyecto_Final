/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'inventario'})
export class AppEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  idProducto: string;

  @Column()
  paisInventario: string;

  @Column()
  cantidadTotal: number;
}
