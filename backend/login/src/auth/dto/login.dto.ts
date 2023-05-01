/* eslint-disable prettier/prettier */
import { MaxLength } from "class-validator";

import { IsNotBlank } from "src/decorator/is-not-blank.decorator";

export class LoginUsuarioDto{
    
    @IsNotBlank({message: 'Nombre de usuario no puede estar vacio'})
    @MaxLength(100, {message: 'nombre de usuario: longitud máxima de 100'})
    nombreUsuario: string;
    
    @IsNotBlank({message: 'Password de usuario no puede estar vacio'})    
    password: string;
}