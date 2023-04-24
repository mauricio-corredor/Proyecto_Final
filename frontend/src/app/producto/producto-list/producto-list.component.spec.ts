import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductoListComponent } from './producto-list.component';
import { ProductoService } from '../producto.service';
import { TipoProducto } from 'src/models/tipoProducto1.enum';

class MockRouter {
  navigate(path: string[]) {}
}

describe('ProductoListComponent', () => {
  let component: ProductoListComponent;
  let fixture: ComponentFixture<ProductoListComponent>;
  let productoService: ProductoService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const productos = [
    {
      idProducto: '1',
      descripcionProducto: 'Producto 1',
      imagenProducto: 'imagen1.png',
      proveedor: 'Proveedor 1',
      fabricanteProducto: 'Fabricante 1',
      volumenProducto: '1',
      tipoProducto: TipoProducto.Cereales,
      fechaVencimiento: '2022-01-01',
      codigoProducto: '25',
      precioProducto: 3000
    },
    {
      idProducto: '2',
      descripcionProducto: 'Producto 2',
      imagenProducto: 'imagen2.png',
      proveedor: 'Proveedor 2',
      fabricanteProducto: 'Fabricante 2',
      volumenProducto: '2',
      tipoProducto: TipoProducto.Frutas,
      fechaVencimiento: '2022-02-02',
      codigoProducto: '30',
      precioProducto: 5000
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoListComponent ],
      providers: [
        {
          provide: ProductoService,
          useValue: { getProductos: () => of(productos) }
        },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({}) }
        },

        { provide: Router,useClass: MockRouter } // toca suministrar el objeto mock Router, no pude con el real

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoListComponent);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ProductoService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a filterValues object with default values', () => {
    expect(component.filterValues).toEqual({
      descripcion: '',
      proveedor: '',
      tipo: '',
      codigo:''
    });
  });

  it('should filter by descripcion', () => {
    component.descripcionFilter = 'Producto 1';
    expect(component.filteredProductos.length).toBe(1);
    expect(component.filteredProductos[0].idProducto).toBe('1');
  });

  it('should filter by proveedor', () => {
    component.proveedorFilter = 'Proveedor 2';
    expect(component.filteredProductos.length).toBe(1);
    expect(component.filteredProductos[0].idProducto).toBe('2');
  });

  it('should filter by tipo', () => {
    component.tipoFilter = TipoProducto.Cereales;
    expect(component.filteredProductos.length).toBe(1);
    expect(component.filteredProductos[0].idProducto).toBe('1');
  });

  it('should clear filters', () => {
    component.descripcionFilter = 'Producto 1';
    component.proveedorFilter = 'Proveedor 2';
    component.descripcionFilter = '';
    component.proveedorFilter = '';
    expect(component.filteredProductos.length).toBe(2);
  });

  it('should show/hide form', () => {
    component.showForm();
    expect(component.openForm).toBeTrue();
    component.hideForm();
    expect(component.openForm).toBeFalse();
  });



})
