/* eslint-disable prettier/prettier */
import { Entity, ManyToMany, Column, PrimaryGeneratedColumn } from 'typeorm';
import { RolNombre } from './rol.enum';
import { UsuarioEntity } from 'src/usuario/usuario.entity';

@Entity({name: 'rol'})
export class RolEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 10, nullable: false, unique: true})
    rolNombre: RolNombre;

    @ManyToMany(type => UsuarioEntity, usuario => usuario.roles)
    usuarios: UsuarioEntity[];
}