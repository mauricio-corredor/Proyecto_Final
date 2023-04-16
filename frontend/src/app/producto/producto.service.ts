import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto';
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
export class ProductoService {

  private apiUrl = environment.baseUrl + '/productos/';
  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl, httpOptions);
  }

  getProductoById(id: string): Observable<Producto> {
    return this.http.get<Producto>(this.apiUrl + id, httpOptions);
  }

  addProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto, httpOptions);
  }

}
