import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { BodegaListComponent } from './bodega-list.component';
import { BodegaService } from '../bodega.service';
import { Paises } from 'src/models/paises.enum';
import { Ciudades } from 'src/models/ciudades.enum';

class MockRouter {
  navigate(path: string[]) {}
}

describe('BodegaListComponent', () => {
  let component: BodegaListComponent;
  let fixture: ComponentFixture<BodegaListComponent>;
  let bodegaService: BodegaService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const bodegas = [
    {
      idBodega: '1',
      nombreBodega: "uno",
      ubicacionPais: "Colombia",
      ubicacionCiudad: "Cali",
      zonaLocalizacion: "dos",
      capacidadVolumen: 50,
      capacidadUsada: 20,
      capacidadDisponible: 30
    },
    {
      idBodega: '2',
      nombreBodega: "dos",
      ubicacionPais: "Peru",
      ubicacionCiudad: "Lima",
      zonaLocalizacion: "dos",
      capacidadVolumen: 50,
      capacidadUsada: 20,
      capacidadDisponible: 30
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodegaListComponent ],
      providers: [
        {
          provide: BodegaService,
          useValue: { getBodegas: () => of(bodegas) }
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
    fixture = TestBed.createComponent(BodegaListComponent);
    component = fixture.componentInstance;
    bodegaService = TestBed.inject(BodegaService);
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
      nombre: '',
      pais: '',
      ciudad: ''
    });
  });

  it('should filter by nombre', () => {
    component.nombreFilter = 'uno';
    expect(component.filteredBodegas.length).toBe(1);
    expect(component.filteredBodegas[0].idBodega).toBe('1');
  });

  it('should filter by pais', () => {
    component.paisFilter = Paises.Peru;
    expect(component.filteredBodegas.length).toBe(1);
    expect(component.filteredBodegas[0].idBodega).toBe('2');
  });

  it('should filter by ciudad', () => {
    component.ciudadFilter = Ciudades.Cali;
    expect(component.filteredBodegas.length).toBe(1);
    expect(component.filteredBodegas[0].idBodega).toBe('1');
  });

  it('should clear filters', () => {
    component.nombreFilter = 'uno';
    component.nombreFilter = '';
    expect(component.filteredBodegas.length).toBe(2);
  });

  it('should show/hide form', () => {
    component.showForm();
    expect(component.openForm).toBeTrue();
    component.hideForm();
    expect(component.openForm).toBeFalse();
  });

  it('should navigate to selected bodega', () => {
    spyOn(component['router'], 'navigate').and.stub();
    component.onSelected(1);
    expect(component['router'].navigate).toHaveBeenCalledWith(['/bodegas/1']);
  });


})
