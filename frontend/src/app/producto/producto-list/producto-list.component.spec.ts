import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductoListComponent } from './producto-list.component';
import { ProductoService } from '../producto.service';
import { of } from 'rxjs';
import { Producto } from '../../../models/producto';
import { TipoProducto } from 'src/models/tipoProducto1.enum';

describe('ProductoListComponent', () => {
  let component: ProductoListComponent;
  let fixture: ComponentFixture<ProductoListComponent>;
  let productoService: jasmine.SpyObj<ProductoService>;

  beforeEach(async () => {
    productoService = jasmine.createSpyObj('ProductoService', ['getProductos']);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ ProductoListComponent ],
      providers: [
        { provide: ProductoService, useValue: productoService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*
  it('should filter productos by descripcion', () => {
    const productos: Producto[] = [
      new Producto('1', 'Producto 1', '', '', '', '', TipoProducto.Perecederos, '', '', 1),
      new Producto('2', 'Producto 2', '', '', '', '', TipoProducto.Frutas, '', '', 2),
      new Producto('3', 'Producto 3', '', '', '', '', TipoProducto.Verduras, '', '', 3),
    ];
    productoService.getProductos.and.returnValue(of(productos));
    fixture.detectChanges();

    component.descripcionFilter = 'Producto 1';

    expect(component.filteredProductos).toEqual([productos[0]]);
  });
  */
/*
  it('should filter productos by proveedor', () => {
    const productos: Producto[] = [
      new Producto('1', '', '', 'Proveedor 1', '', '', TipoProducto.Perecederos, '', '', 1),
      new Producto('2', '', '', 'Proveedor 2', '', '', TipoProducto.Frutas, '', '', 2),
      new Producto('3', '', '', 'Proveedor 1', '', '', TipoProducto.Verduras, '', '', 3),
    ];
    productoService.getProductos.and.returnValue(of(productos));
    fixture.detectChanges();

    component.proveedorFilter = 'Proveedor 1';

    expect(component.filteredProductos).toEqual([productos[0], productos[2]]);
  });
  */
/*
  it('should filter productos by tipo', () => {
    const productos: Producto[] = [
      new Producto('1', '', '', '', '', '', TipoProducto.Perecederos, '', '', 1),
      new Producto('2', '', '', '', '', '', TipoProducto.Frutas, '', '', 2),
      new Producto('3', '', '', '', '', '', TipoProducto.Verduras, '', '', 3),
    ];
    productoService.getProductos.and.returnValue(of(productos));
    fixture.detectChanges();

    component.tipoFilter = TipoProducto.Perecederos;

    expect(component.filteredProductos).toEqual([productos[0], productos[2]]);
  });
*/
/*  it('should filter productos by codigo', () => {
    const productos: Producto[] = [
      new Producto('1', '', '', '', '', '', TipoProducto.Perecederos, '', 'CODIGO1', 1),
      new Producto('2', '', '', '', '', '', TipoProducto.NoPerecederos, '', 'CODIGO2', 2),
      new Producto('3', '', '', '', '', '', TipoProducto.Perecederos, '', 'COD
      */
})
