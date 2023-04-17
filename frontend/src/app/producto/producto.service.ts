import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../../models/producto';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = environment.baseUrl + '/productos/';
  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProductoById(id: string): Observable<Producto> {
    return this.http.get<Producto>(this.apiUrl + id);
  }

  addProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

}
