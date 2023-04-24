import { async, ComponentFixture, TestBed,  } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { ProductoService } from 'src/app/producto/producto.service';
import { Producto } from 'src/models/producto';
import { ProductoCreateComponent } from './producto-create.component';
import { EMPTY } from 'rxjs';
describe('ProductoCreateComponent', () => {
  let component: ProductoCreateComponent;
  let fixture: ComponentFixture<ProductoCreateComponent>;
  let productoService: jasmine.SpyObj<ProductoService>;

  beforeEach(async(() => {
    productoService = jasmine.createSpyObj('ProductoService', ['addProducto']);
    TestBed.configureTestingModule({
      declarations: [ ProductoCreateComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule, ToastrModule.forRoot() ],
      providers: [
        { provide: ProductoService, useValue: productoService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ProductoCreateComponent', () => {
    it('debería estar definido', () => {
      expect(ProductoCreateComponent).toBeDefined();
    });
  });
/*
  it('should create a new producto', () => {
    const newProducto = new Producto(   '5753fcfa-215e-4b51-939e-ef5c783f1cb8',
    'Producto de prueba',
    'https://www.google.com/imgres?imgurl=https%3A%2F%2Flicores24.com%2Fwp-content%2Fuploads%2F2020%2F04%2Fcoca-cola-350-ml-vidrio.png&tbnid=3fxUxGM1J-jM5M&vet=12ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg..i&imgrefurl=https%3A%2F%2Flicores24.com%2Fproducto%2Fcoca-cola-350ml-canasta-x30%2F&docid=aYHlQnrxI_jUyM&w=529&h=529&q=coca%20cola&client=safari&ved=2ahUKEwjky9j7yIz-AhUtmIQIHS_VC6sQMygVegUIARCWAg',
    'D1',
    'Femsa',
    '750',
    'Gaseosa',
    new Date().toString(),
    'CP02',
    8.50);
    productoService.addProducto.and.returnValue(EMPTY);
    spyOn(component.getToast(), 'success');
    spyOn(component, 'hideForm');
    component.createProducto(newProducto);
    expect(productoService.addProducto).toHaveBeenCalledWith(newProducto);
    expect(component.getToast().success).toHaveBeenCalled();
    expect(component.hideForm).toHaveBeenCalled();
  });
  */
});

