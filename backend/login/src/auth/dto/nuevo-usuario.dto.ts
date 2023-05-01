/* eslint-disable prettier/prettier */
import { IsString, MaxLength } from "class-validator";

import { IsNotBlank } from "src/decorator/is-not-blank.decorator";

export class NuevoUsuarioDto{
    @IsString()
    @MaxLength(10, {message: 'nombre: longitud máxima de 100'})
    nombre: string;

    @IsNotBlank({message: 'Nombre de usuario no puede estar vacio'})
    @MaxLength(10, {message: 'nombre de usuario: longitud máxima de 100'})
    nombreUsuario: string;

    @IsNotBlank({message: 'Password de usuario no puede estar vacio'})    
    password: string;
}