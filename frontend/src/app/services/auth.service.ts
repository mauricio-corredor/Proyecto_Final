import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUsuarioDto } from 'src/models/login-usuario.dto';
import { NuevoUsuarioDto } from 'src/models/nuevo-usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authUrl;
  constructor(private httpClient: HttpClient) { }

  login(dto: LoginUsuarioDto): Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'login', dto);
  }

  registro(dto: NuevoUsuarioDto): Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'nuevo', dto);
  }
}
