/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { RolEntity } from 'src/rol/rol.entity';
import { RolNombre } from 'src/rol/rol.enum';

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository: Repository<RolEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,
    ){}
    
    async getAll(): Promise<UsuarioEntity[]>{
        const usuarios = await this.usuarioRepository.find();
        if(!usuarios.length){
            throw new NotFoundException(new MessageDto('No hay usuarios en la lista'));
        }
        return usuarios;
    }

    async create(dto: CreateUsuarioDto): Promise<any> {
        const {nombreUsuario} = dto;
        const exists = await this.usuarioRepository.findOne({where: [{nombreUsuario: nombreUsuario}]});
        if(exists)
            throw new BadRequestException(new MessageDto("Ya existe un usuario con ese nombre"));      
        const rolAdmin = await this.rolRepository.findOne({ where: { rolNombre: RolNombre.ADMIN }});  
        const rolUser = await this.rolRepository.findOne({ where: { rolNombre: RolNombre.USER }});  
        
        if(!rolAdmin || !rolUser)
            throw new InternalServerErrorException(new MessageDto('Los roles aún no han sido creados'));

        const admin = this.usuarioRepository.create(dto);
        admin.roles = [rolAdmin, rolUser];

        await this.usuarioRepository.save(admin);
        return new MessageDto('admin creado')
    }
}
