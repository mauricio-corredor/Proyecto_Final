/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { ProductoService } from './producto.service';
import { Producto } from 'src/models/producto';

describe('Service: Producto', () => {

  let service: ProductoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductoService]
    });
    service = TestBed.inject(ProductoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería agregar un nuevo producto a través de una solicitud HTTP POST', () => {
    const newProducto: Producto = {
      idProducto: '5753fcfa-215e-4b51-939e-ef5c783f1cb8',
      descripcionProducto: 'Producto de prueba',
      imagenProducto: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Flicores24.com%2Fwp-content%2Fuploads%2F2020%2F04%2Fcoca-cola-350-ml-vidrio.png&tbnid=3fxUxGM1J-jM5M&vet=12ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg..i&imgrefurl=https%3A%2F%2Flicores24.com%2Fproducto%2Fcoca-cola-350ml-canasta-x30%2F&docid=aYHlQnrxI_jUyM&w=529&h=529&q=coca%20cola&client=safari&ved=2ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg',
      proveedor: 'D1',
      fabricanteProducto: 'Femsa',
      volumenProducto: '750',
      tipoProducto: 'Gaseosa',
      fechaVencimiento: new Date().toString(),
      codigoProducto: 'CP02',
      precioProducto: 8.50,
    };

    service.addProducto(newProducto).subscribe(res => {
      expect(res).toEqual(newProducto);
    });

    const req = httpMock.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toEqual('POST');
    req.flush(newProducto);
  });


  it('debería obtener una lista de productos a través de una solicitud HTTP GET', () => {
    const mockProductos: Producto[] = [
      {
        idProducto: '5753fcfa-215e-4b51-939e-ef5c783f1cb8',
        descripcionProducto: 'Producto de prueba 1',
        imagenProducto: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Flicores24.com%2Fwp-content%2Fuploads%2F2020%2F04%2Fcoca-cola-350-ml-vidrio.png&tbnid=3fxUxGM1J-jM5M&vet=12ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg..i&imgrefurl=https%3A%2F%2Flicores24.com%2Fproducto%2Fcoca-cola-350ml-canasta-x30%2F&docid=aYHlQnrxI_jUyM&w=529&h=529&q=coca%20cola&client=safari&ved=2ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg',
        proveedor: 'D1',
        fabricanteProducto: 'Femsa',
        volumenProducto: '750',
        tipoProducto: 'Gaseosa',
        fechaVencimiento: new Date().toString(),
        codigoProducto: 'CP02',
        precioProducto: 8.50
     },
     {
      idProducto: '4562fcfa-215e-8e51-569e-ef5c783d5fr8',
      descripcionProducto: 'Producto de prueba 2',
      imagenProducto: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Flicores24.com%2Fwp-content%2Fuploads%2F2020%2F04%2Fcoca-cola-350-ml-vidrio.png&tbnid=3fxUxGM1J-jM5M&vet=12ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg..i&imgrefurl=https%3A%2F%2Flicores24.com%2Fproducto%2Fcoca-cola-350ml-canasta-x30%2F&docid=aYHlQnrxI_jUyM&w=529&h=529&q=coca%20cola&client=safari&ved=2ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg',
      proveedor: 'D2',
      fabricanteProducto: 'Fabr',
      volumenProducto: '250',
      tipoProducto: 'Chocolate',
      fechaVencimiento: new Date().toString(),
      codigoProducto: 'CP05',
      precioProducto: 2.50,
     }
    ];

    service.getProductos().subscribe(res => {
      expect(res).toEqual(mockProductos);
    });

    const req = httpMock.expectOne(`${service.apiUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProductos);
  });

  it('debería obtener un producto por ID a través de una solicitud HTTP GET', () => {
    const mockProducto: Producto =
    {
      idProducto: '5753fcfa-215e-4b51-939e-ef5c783f1cb8',
        descripcionProducto: 'Producto de prueba 1',
        imagenProducto: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Flicores24.com%2Fwp-content%2Fuploads%2F2020%2F04%2Fcoca-cola-350-ml-vidrio.png&tbnid=3fxUxGM1J-jM5M&vet=12ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg..i&imgrefurl=https%3A%2F%2Flicores24.com%2Fproducto%2Fcoca-cola-350ml-canasta-x30%2F&docid=aYHlQnrxI_jUyM&w=529&h=529&q=coca%20cola&client=safari&ved=2ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg',
        proveedor: 'D1',
        fabricanteProducto: 'Femsa',
        volumenProducto: '750',
        tipoProducto: 'Gaseosa',
        fechaVencimiento: new Date().toString(),
        codigoProducto: 'CP02',
        precioProducto: 8.50
     };
    const id = '5753fcfa-215e-4b51-939e-ef5c783f1cb8';

    service.getProductoById(id).subscribe(res => {
      expect(res).toEqual(mockProducto);
    });

    const req = httpMock.expectOne(`${service.apiUrl}${id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProducto);
  });

  it('should ...', inject([ProductoService], (service: ProductoService) => {
    expect(service).toBeTruthy();
  }));
});
