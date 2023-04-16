import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bodega } from '../../models/bodega';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BodegaService {

  private apiUrl = environment.baseUrl + '/bodegas/';
  constructor(private http: HttpClient) { }

  getBodegas(): Observable<Bodega[]> {
    return this.http.get<Bodega[]>(this.apiUrl);
  }

  getBodegaById(id: string): Observable<Bodega> {
    return this.http.get<Bodega>(this.apiUrl + id);
  }

  addBodega(bodega: Bodega): Observable<Bodega> {
    return this.http.post<Bodega>(this.apiUrl, bodega);
  }



}
