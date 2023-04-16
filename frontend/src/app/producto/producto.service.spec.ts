import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, inject, TestBed } from '@angular/core/testing';
import * as faker from 'faker';
import { Producto } from 'src/models/producto';
import { Genre } from 'src/models/genre.enum';
import { Performer } from 'src/models/performer';
import { RecordLabel } from 'src/models/recordLabel.enum';
import { Track } from 'src/models/track';

import { TipoProducto } from 'src/models/tipoProducto1.enum';
import { ProductoService } from './producto.service';


describe('ProductoService', () => {
  let service: ProductoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductoService]
    });
    service = TestBed.inject(ProductoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all productos from the API via GET', () => {
    const mockProductos: Producto[] = [
      new Producto('1', 'Producto 1', 'imagen1.jpg', 'Proveedor 1', 'Fabricante 1', '100ml', 'Frutas', '2023-12-31', '23545', 5000),
      new Producto('2', 'Producto 2', 'imagen2.jpg', 'Proveedor 2', 'Fabricante 2', '200ml', 'Perecederos', '2024-12-31', '23545', 5000)
    ];

    service.getProductos().subscribe(productos => {
      expect(productos.length).toBe(2);
      expect(productos).toEqual(mockProductos);
    });

    const req = httpTestingController.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockProductos);
  });

  it('should retrieve a single producto from the API via GET', () => {
    const mockProducto: Producto = new Producto('1', 'Producto 1', 'imagen1.jpg', 'Proveedor 1', 'Fabricante 1', '100ml', 'Frutas', '2023-12-31', '23545', 5000);

    service.getProductoById('1').subscribe(producto => {
      expect(producto).toEqual(mockProducto);
    });

    const req = httpTestingController.expectOne(service['apiUrl'] + '1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducto);
  });

  it('should add a new producto to the API via POST', () => {
    const mockProducto: Producto = new Producto('1', 'Producto 1', 'imagen1.jpg', 'Proveedor 1', 'Fabricante 1', '100ml', 'Frutas', '2023-12-31', '23545', 5000);

    service.addProducto(mockProducto).subscribe(producto => {
      expect(producto).toEqual(mockProducto);
    });

    const req = httpTestingController.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProducto);
    req.flush(mockProducto);
  });
});

