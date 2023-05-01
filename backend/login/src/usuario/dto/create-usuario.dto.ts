/* eslint-disable prettier/prettier */
import { IsString, MaxLength } from "class-validator";

import { IsNotBlank } from "src/decorator/is-not-blank.decorator";

export class CreateUsuarioDto{
    @IsString()
    @MaxLength(100, {message: 'nombre: longitud máxima de 10'})
    nombre: string;

    @IsNotBlank({message: 'Nombre de usuario no puede estar vacio'})
    @MaxLength(100, {message: 'nombre de usuario: longitud máxima de 10'})
    nombreUsuario: string;

    @IsNotBlank({message: 'Password de usuario no puede estar vacio'})    
    password: string;
}