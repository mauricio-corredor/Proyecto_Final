import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventario } from '../../models/inventario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private apiUrl = environment.inventarioUrl + '/inventarios/';
  constructor(private http: HttpClient) { }

  getInventarios(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(this.apiUrl);
  }

}
