/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NuevoUsuarioDto } from './dto/nuevo-usuario.dto';
import { LoginUsuarioDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Get()
    getAll(){
        return this.authService.getAll();
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post('nuevo')
    create(@Body() dto: NuevoUsuarioDto){
        return this.authService.create(dto);
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post('login')
    login(@Body() dto: LoginUsuarioDto){
        console.log(dto.nombreUsuario, " ", dto.password);        
        return this.authService.login(dto);
    }

    @Get('health')
    async get(){
        return 'OK';
    }

}
