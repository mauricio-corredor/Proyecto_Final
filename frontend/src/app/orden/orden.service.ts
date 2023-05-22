import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orden } from '../../models/orden';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private apiUrl = environment.ordenUrl + '/ordenes/';
  constructor(private http: HttpClient) { }

  getOrdenes(): Observable<Orden[]> {
    return this.http.get<Orden[]>(this.apiUrl);
  }

  getOrdenById(id: string): Observable<Orden> {
    return this.http.get<Orden>(this.apiUrl + 'orden/' + id);
  }


}

