import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  isLogged(): boolean {
    if(this.getToken())
      return true;
    return false;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  getNombreUsuario(): string | null {
    if(!this.isLogged())
      return null;
    const token = this.getToken();
    const payload = token?.split('.')[1];
    if (payload === undefined)
      return null
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const nombreUsuario = valuesJson.nombreUsuario
    return nombreUsuario;
  }


  getEsRolUsuarioAdmin(): boolean {
    if(!this.isLogged())
      return false;
    const token = this.getToken();
    const payload = token?.split('.')[1];
    if (payload === undefined)
      return false
    const values = atob(payload);
    const valuesJson = JSON.parse(values);
    const rolesUsuario = valuesJson.roles;
    const rol = rolesUsuario.find((r: string) => r === 'admin');
    if(rol != undefined)
      return true;
    return false;
  }

  logOut(): void {
    localStorage.clear();
  }
}
