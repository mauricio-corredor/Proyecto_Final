import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductoService } from '../producto.service';

import { ProductoDetailComponent } from './producto-detail.component';
import { Producto } from 'src/models/producto';

describe('ProductoDetailComponent', () => {
  let component: ProductoDetailComponent;
  let fixture: ComponentFixture<ProductoDetailComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let productoServiceSpy: jasmine.SpyObj<ProductoService>;

  beforeEach(async () => {
    const router = jasmine.createSpyObj('Router', ['navigate']);
    const productoService = jasmine.createSpyObj('ProductoService', ['getProductoById']);
    await TestBed.configureTestingModule({
      declarations: [ ProductoDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: Router, useValue: router },
        { provide: ProductoService, useValue: productoService }
      ]
    })
    .compileComponents();

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    productoServiceSpy = TestBed.inject(ProductoService) as jasmine.SpyObj<ProductoService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*
  it('should call getProductoDetail and set productoDetail', () => {
    const mockProducto = new Producto(
      '5753fcfa-215e-4b51-939e-ef5c783f1cb8',
      'Producto de prueba',
      'https://www.google.com/imgres?imgurl=https%3A%2F%2Flicores24.com%2Fwp-content%2Fuploads%2F2020%2F04%2Fcoca-cola-350-ml-vidrio.png&tbnid=3fxUxGM1J-jM5M&vet=12ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg..i&imgrefurl=https%3A%2F%2Flicores24.com%2Fproducto%2Fcoca-cola-350ml-canasta-x30%2F&docid=aYHlQnrxI_jUyM&w=529&h=529&q=coca%20cola&client=safari&ved=2ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg',
      'D1',
      'Femsa',
      '750',
      'Gaseosa',
      new Date().toString(),
      'CP02',
      8.50
    );
    productoServiceSpy.getProductoById.and.returnValue(of(mockProducto));

    component.ngOnInit();

    expect(component.productoDetail).toEqual(mockProducto);
    expect(productoServiceSpy.getProductoById).toHaveBeenCalledWith('5753fcfa-215e-4b51-939e-ef5c783f1cb8');
  });

  it('should not call getProductoDetail if productoDetail is defined', () => {
    const mockProducto = new Producto(
      '5753fcfa-215e-4b51-939e-ef5c783f1cb8',
      'Producto de prueba',
      'https://www.google.com/imgres?imgurl=https%3A%2F%2Flicores24.com%2Fwp-content%2Fuploads%2F2020%2F04%2Fcoca-cola-350-ml-vidrio.png&tbnid=3fxUxGM1J-jM5M&vet=12ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg..i&imgrefurl=https%3A%2F%2Flicores24.com%2Fproducto%2Fcoca-cola-350ml-canasta-x30%2F&docid=aYHlQnrxI_jUyM&w=529&h=529&q=coca%20cola&client=safari&ved=2ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg',
      'D1',
      'Femsa',
      '750',
      'Gaseosa',
      new Date().toString(),
      'CP02',
      8.50
          );
    component.productoDetail = mockProducto;

    component.ngOnInit();

    expect(productoServiceSpy.getProductoById).not.toHaveBeenCalled();
  });
*/
});
