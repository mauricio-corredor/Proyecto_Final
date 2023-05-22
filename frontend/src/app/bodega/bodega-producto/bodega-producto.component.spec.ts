/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BodegaProductoComponent } from './bodega-producto.component';
import { BodegaService } from '../bodega.service';
import { ProductoService } from 'src/app/producto/producto.service';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { MenuComponent } from 'src/app/menu/menu.component';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

describe('BodegaProductoComponent', () => {
  let component: BodegaProductoComponent;
  let fixture: ComponentFixture<BodegaProductoComponent>;
  let bodegaService: BodegaService;
  let productoService: ProductoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodegaProductoComponent, MenuComponent ],
      imports: [FormsModule, HttpClientModule, NgbCollapse, ReactiveFormsModule, RouterTestingModule, ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => {
              return new TranslateHttpLoader(http, './assets/i18n/', '.json');
            },
            deps: [HttpClient]
          }
        }),],
      providers: [BodegaService, ProductoService, TranslateService,
        { provide: AppComponent, useValue: {} },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodegaProductoComponent);
    component = fixture.componentInstance;
    bodegaService = TestBed.inject(BodegaService);
    productoService = TestBed.inject(ProductoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
