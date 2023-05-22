/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BodegaCreateComponent } from './bodega-create.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BodegaService } from '../bodega.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Bodega } from 'src/models/bodega';
import { of, throwError } from 'rxjs';
import { MenuComponent } from 'src/app/menu/menu.component';

describe('BodegaCreateComponent', () => {
  let component: BodegaCreateComponent;
  let fixture: ComponentFixture<BodegaCreateComponent>;
  let toastrService: ToastrService;
  let bodegaService: BodegaService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodegaCreateComponent, MenuComponent ],
      imports: [FormsModule, HttpClientModule, ReactiveFormsModule, RouterTestingModule, ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => {
              return new TranslateHttpLoader(http, './assets/i18n/', '.json');
            },
            deps: [HttpClient]
          }
        }),],
      providers: [BodegaService, ToastrService, TranslateService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodegaCreateComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    bodegaService = TestBed.inject(BodegaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide the form when hideForm is called', () => {
    spyOn(component.cancelForm, 'emit');
    component.hideForm();
    expect(component.cancelForm.emit).toHaveBeenCalled();
  });

it('should create a new bodega', fakeAsync(() => {
  const newBodega: Bodega = {
    nombreBodega: 'Test Bodega',
    ubicacionPais: 'Test Pais',
    ubicacionCiudad: 'Test Ciudad',
    zonaLocalizacion: 'Test Zona',
    capacidadVolumen: 100,
    capacidadUsada: 50,
    CapacidadDisponible: 50,
    idBodega: '1'
  };

  spyOn(toastrService, 'success');
  spyOn(toastrService, 'error');
  spyOn(bodegaService, 'addBodega').and.returnValue(of(newBodega));


  component.createBodega(newBodega);
  tick();

  expect(toastrService.success).toHaveBeenCalledWith('Bodega created');
  expect(toastrService.error).not.toHaveBeenCalled();
}));

  it('should show an error message when creating a new bodega fails', fakeAsync(() => {
    const newBodega: Bodega = {
      nombreBodega: 'Test Bodega',
      ubicacionPais: 'Test Pais',
      ubicacionCiudad: 'Test Ciudad',
      zonaLocalizacion: 'Test Zona',
      capacidadVolumen: 100,
      capacidadUsada: 50,
      CapacidadDisponible: 50,
      idBodega: ''
    };
    const errorMessage = 'Error creating bodega';

    spyOn(toastrService, 'success');
    spyOn(toastrService, 'error');
    spyOn(bodegaService, 'addBodega').and.returnValue(throwError(errorMessage));

    component.createBodega(newBodega);
    tick();

    expect(toastrService.success).not.toHaveBeenCalled();
    expect(toastrService.error).toHaveBeenCalledWith(errorMessage, 'Error');
  }));


});
