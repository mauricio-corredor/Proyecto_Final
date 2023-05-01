/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RolEntity } from './rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageDto } from 'src/common/message.dto';
import { CreateRolDto } from './dto/create-rol.dto';

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository: Repository<RolEntity>,
    ){}
    
    async getAll(): Promise<RolEntity[]>{
        const roles = await this.rolRepository.find();
        if(!roles.length){
            throw new NotFoundException(new MessageDto('No hay roles en la lista'));
        }
        return roles;
    }

    async create(dto: CreateRolDto): Promise<any> {
        const exists = await this.rolRepository.findOne({where: {rolNombre: dto.rolNombre}});
        if(exists)
            throw new BadRequestException(new MessageDto("Ya existe un rol con ese nombre"));        
        await this.rolRepository.save(dto);
        return new MessageDto(`rol ${ dto.rolNombre } creado` )
    }

}
