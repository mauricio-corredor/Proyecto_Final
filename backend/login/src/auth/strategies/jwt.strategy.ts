/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Repository } from 'typeorm';
import { MessageDto } from "src/common/message.dto";
import { PayloadInterface } from "../payload.Interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectRepository(UsuarioEntity)        
        private readonly authRepository: Repository<UsuarioEntity>
    )
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret'
        });        
    }

    async validate(payload: PayloadInterface){
        const {nombreUsuario} = payload;
        const usuario = await this.authRepository.findOne({where: [{nombreUsuario: nombreUsuario}]});
        if(!usuario) 
            return new UnauthorizedException(new MessageDto('Credenciales erróneas'));       
        return payload;
    }
}