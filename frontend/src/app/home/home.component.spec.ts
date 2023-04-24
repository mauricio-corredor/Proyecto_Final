import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Producto } from 'src/models/producto';
import { ProductoService } from '../producto/producto.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productoServiceSpy: jasmine.SpyObj<ProductoService>;

  beforeEach(async () => {
    productoServiceSpy = jasmine.createSpyObj('ProductoService', ['getProductos']);

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        { provide: ProductoService, useValue: productoServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  describe('HomeComponent', () => {
    it('debería estar definido', () => {
      expect(HomeComponent).toBeDefined();
    });
  });

 // it('should create', () => {
    //expect(component).toBeTruthy();
 // });

});
