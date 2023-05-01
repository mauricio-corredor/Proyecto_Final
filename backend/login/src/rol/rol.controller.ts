/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, ValidationPipe, UsePipes } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';

@Controller('rol')
export class RolController {
    constructor(private readonly rolService: RolService){}

    @Get()
    getAll(){
        return this.rolService.getAll();
    }

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post()
    create(@Body() dto: CreateRolDto){
        return this.rolService.create(dto);
    }
}
