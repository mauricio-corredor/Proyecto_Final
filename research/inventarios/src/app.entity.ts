import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AppEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column()
  productName: string;

  @Column()
  productDescription: string;

  @Column()
  countryCode: string;

  @Column()
  count: number;
}
