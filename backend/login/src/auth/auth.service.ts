/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolEntity } from 'src/rol/rol.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { Repository } from 'typeorm';
import { NuevoUsuarioDto } from './dto/nuevo-usuario.dto';
import { MessageDto } from 'src/common/message.dto';
import { RolNombre } from 'src/rol/rol.enum';
import { LoginUsuarioDto } from './dto/login.dto';
import { compare } from 'bcryptjs';
import { PayloadInterface } from './payload.Interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository: Repository<RolEntity>,
        @InjectRepository(UsuarioEntity)
        private readonly authRepository: Repository<UsuarioEntity>,
        private readonly jwtService: JwtService,
    ){}
    
    async getAll(): Promise<UsuarioEntity[]>{
        const usuarios = await this.authRepository.find();
        if(!usuarios.length){
            throw new NotFoundException(new MessageDto('No hay usuarios en la lista'));
        }
        return usuarios;
    }

    async create(dto: NuevoUsuarioDto): Promise<any> {
        const {nombreUsuario} = dto;
        const exists = await this.authRepository.findOne({where: [{nombreUsuario: nombreUsuario}]});
        if(exists)
            throw new BadRequestException(new MessageDto("Ya existe un usuario con ese nombre"));      
        
        const rolUser = await this.rolRepository.findOne({ where: { rolNombre: RolNombre.USER }});  
        
        if(!rolUser)
            throw new InternalServerErrorException(new MessageDto('El Rol User aún no ha sido creado'));

        const user = this.authRepository.create(dto);
        user.roles = [rolUser];

        await this.authRepository.save(user);
        return new MessageDto('usuario creado')
    }

    async login(dto: LoginUsuarioDto): Promise<any>{
        const {nombreUsuario} = dto;
        const usuario = await this.authRepository.findOne({where: [{nombreUsuario: nombreUsuario}]});
        console.log(usuario);
        if(!usuario)
            return new UnauthorizedException(new MessageDto('No existe el usuario'));
        
        const passwordOK = await compare(dto.password, usuario.password);
        if(!passwordOK)
            return new UnauthorizedException(new MessageDto('Contraseña errónea'));

        const payload: PayloadInterface = {
            id: usuario.id,
            nombreUsuario: usuario.nombreUsuario,
            roles: usuario.roles.map(rol => rol.rolNombre )
        }

        const token = this.jwtService.sign(payload);
        console.log(token);
        return {token};


    }
}
