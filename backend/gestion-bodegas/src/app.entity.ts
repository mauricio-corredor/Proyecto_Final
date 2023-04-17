import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
  @Column()
  capacidadVolumen: number;
  @Column()
  capacidadUsada: number;
  @Column()
  CapacidadDisponible: number;
}
