/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bodega' })
export class AppEntity {
  @PrimaryGeneratedColumn('uuid')
  idBodega: string;
  @Column()
  nombreBodega: string;
  @Column()
  ubicacionPais: string;
  @Column()
  ubicacionCiudad: string;
  @Column()
  zonaLocalizacion: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  capacidadVolumen: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  capacidadUsada: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  CapacidadDisponible: number;
}
