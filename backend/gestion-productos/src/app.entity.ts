import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AppEntity {
  @PrimaryGeneratedColumn('uuid')
  idProducto: string;
  @Column()
  descripcionProducto: string;
  @Column()
  imagenProducto: string;
  @Column()
  proveedor: string;
  @Column()
  fabricanteProducto: string;
  @Column()
  volumenProducto: string;
  @Column()
  tipoProducto: string;
  @Column()
  fechaVencimiento: string;
  @Column()
  codigoProducto: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioProducto: number;
}
