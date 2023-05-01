/* eslint-disable prettier/prettier */
import { hash } from 'bcryptjs';
import { RolEntity } from 'src/rol/rol.entity';
import { Entity, ManyToMany, Column, PrimaryGeneratedColumn, JoinTable, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity({name: 'usuario'})
export class UsuarioEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 100, nullable: true, unique: true})
    nombre: string;

    @Column({type: 'varchar', length: 100, nullable: true, unique: true})
    nombreUsuario: string;
    
    @Column({type: 'varchar', nullable: true})
    password: string;

    @ManyToMany(type => RolEntity, rol => rol.usuarios, {eager: true})
    @JoinTable({
        name: 'usuario_rol',
        joinColumn: {name: 'usuario_id'},
        inverseJoinColumn: {name: 'rol_id'}
    })
    roles: RolEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(!this.password) return;
        this.password = await hash(this.password, 10);
    }

}