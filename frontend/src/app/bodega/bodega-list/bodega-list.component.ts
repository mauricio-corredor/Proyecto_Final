import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Bodega } from '../../../models/bodega';
import { BodegaService } from '../bodega.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ZonaLocalizacion } from 'src/models/zonaLocalizacion.enum';
import { Ciudades } from 'src/models/ciudades.enum';
import { Paises } from 'src/models/paises.enum';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega-list.component.html',
  styleUrls: ['./bodega-list.component.css']
})
export class BodegaListComponent implements OnInit{
  imageWidth: number = 250;
  imageHeight: number = 230;
  scroll: boolean;
  fixedStyle: object = {"position": "fixed"};
  display: object = {"display": "none"};
  sub: Subscription;
  bodegas: Bodega[];
  paises: string[];
  zonas: ZonaLocalizacion[];
  ciudadesArray: string[] = [];
  paisesArray: string[] = [];
  filteredBodegas: Bodega[] = [];
  filterValues: { [filter: string]: string } = {
    nombre: "",
    pais: "",
    ciudad: ""
  };
  openForm: boolean = false;

  private _nombreFilter: string;
  get nombreFilter(): string {
    return this._nombreFilter;
  }
  set nombreFilter(value: string) {
    this._nombreFilter = value;
    this.filterValues.nombre = value
    this.filteredBodegas = this.performFilters();
  }

  private _paisFilter: Paises;
  get paisFilter(): Paises {
    return this._paisFilter;
  }
  set paisFilter(value: Paises) {
    this._paisFilter = value;
    this.filterValues.pais = value
    this.filteredBodegas = this.performFilters();
  }

  private _ciudadFilter: Ciudades;
  get ciudadFilter(): Ciudades {
    return this._ciudadFilter;
  }
  set ciudadFilter(value: Ciudades) {
    this._ciudadFilter = value;
    this.filterValues.ciudad = value
    this.filteredBodegas = this.performFilters();
  }


  constructor(private bodegaService: BodegaService,
    public router: Router,
    public route: ActivatedRoute) {

      Object.keys(Ciudades).forEach(key => {

        if (isNaN(parseInt(key))) {
          this.ciudadesArray.push(Ciudades[key]);
        }
      });

      Object.keys(Paises).forEach(key => {

        if (isNaN(parseInt(key))) {
          this.paisesArray.push(Paises[key]);
        }
      });

    }



  performFilters(): Bodega[] {
    let bodegas: Bodega[] = []

    if (this.filterValues.nombre === "" && this.filterValues.pais === "" &&
        this.filterValues.ciudad === "") {
          bodegas = this.bodegas;
          return bodegas;
    }

    if (this.filterValues.nombre !== "") {
      this.performNombreFilter().forEach(x=> bodegas.push(x));
    }

    if (this.filterValues.pais !== "") {
      this.performPaisFilter().forEach(x=> bodegas.push(x));
    }

    if (this.filterValues.ciudad !== "") {
      this.performCiudadFilter().forEach(x=> bodegas.push(x));
    }


    return [...new Set(bodegas)].sort((a, b) => (a.nombreBodega < b.nombreBodega ? -1 : 1));
  }

  performNombreFilter(): Bodega[] {
    return this.bodegas.filter((bodega: Bodega) =>
      bodega.nombreBodega.includes(this.filterValues.nombre));
  }

  performPaisFilter(): Bodega[] {
    return this.bodegas.filter((bodega: Bodega) =>
      bodega.ubicacionPais.includes(this.filterValues.pais));
  }

  performCiudadFilter(): Bodega[] {
    return this.bodegas.filter((bodega: Bodega) =>
      bodega.ubicacionCiudad.includes(this.filterValues.ciudad));
  }


  onSelected(bodegaId: number): void {
    this.router.navigate(['/bodegas/' + bodegaId]);
  }

  showForm() {
    this.openForm = true;
  }

  hideForm() {
    this.openForm = false;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      if (p['nombre'] || p['pais'] || p['ciudad']) {
        setTimeout(() => {
          if (p['nombre']) {
            this.nombreFilter = p['nombre']
          }
          if (p['pais']) {
            this.paisFilter = p['pais']
          }
          if (p['ciudad']) {
            this.ciudadFilter = p['ciudad']
          }

        }, 1000);
      }
    });
    this.sub = this.bodegaService.getBodegas().subscribe(bodegas => {
      this.bodegas = bodegas.sort((a, b) => (a.nombreBodega < b.nombreBodega ? -1 : 1));
      this.filteredBodegas = this.bodegas;
   });

    this.zonas = [
      ZonaLocalizacion.Centro,
      ZonaLocalizacion.Norte,
      ZonaLocalizacion.Occidente,
      ZonaLocalizacion.Oriente,
      ZonaLocalizacion.Sur
    ]
  }

}
