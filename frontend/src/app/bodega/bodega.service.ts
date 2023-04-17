import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bodega } from '../../models/bodega';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':'x-requested-with, Request-Header, Response-Header',
    'Access-Control-Allow-Methods':'POST, GET, PUT, OPTIONS, DELETE'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BodegaService {

  private apiUrl = environment.bodegaUrl + '/bodegas/';
  constructor(private http: HttpClient) { }

  getBodegas(): Observable<Bodega[]> {
    return this.http.get<Bodega[]>(this.apiUrl, httpOptions);
  }

  getBodegaById(id: string): Observable<Bodega> {
    return this.http.get<Bodega>(this.apiUrl + id, httpOptions);
  }

  addBodega(bodega: Bodega): Observable<Bodega> {
    return this.http.post<Bodega>(this.apiUrl, bodega, httpOptions);
  }

}
