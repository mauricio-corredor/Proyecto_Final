import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Bodega } from '../../../models/bodega';
import { BodegaService } from '../bodega.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ZonaLocalizacion } from 'src/models/zonaLocalizacion.enum';

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
  ubicacionPaises: string[];
  zonaLocalizaciones: ZonaLocalizacion[];
  filteredBodegas: Bodega[] = [];
  filterValues: { [filter: string]: string } = {
    nombre: "",
    ubicacionPais: "",
    zonaLocalizacion: ""
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

  private _ubicacionPaisFilter: string;
  get ubicacionPaisFilter(): string {
    return this._ubicacionPaisFilter;
  }
  set ubicacionPaisFilter(value: string) {
    this._ubicacionPaisFilter = value;
    this.filterValues.ubicacionPais = value
    this.filteredBodegas = this.performFilters();
  }

  private _zonaLocalizacionFilter: ZonaLocalizacion;
  get zonaLocalizacionFilter(): ZonaLocalizacion {
    return this._zonaLocalizacionFilter;
  }
  set zonaLocalizacionFilter(value: ZonaLocalizacion) {
    this._zonaLocalizacionFilter = value;
    this.filterValues.zonaLocalizacion = value
    this.filteredBodegas = this.performFilters();
  }

  constructor(private bodegaService: BodegaService,
    public router: Router,
    public route: ActivatedRoute) { }

  performFilters(): Bodega[] {
    let bodegas: Bodega[] = []

    if (this.filterValues.nombre === "" && this.filterValues.ubicacionPais === "" && this.filterValues.zonaLocalizacion === "") {
      return bodegas = this.bodegas;
    }
    if (this.filterValues.nombre !== "") {
      this.performNombreFilter().forEach(x=> bodegas.push(x));
    }
    if (this.filterValues.ubicacionPais !== "") {
      this.performUbicacionFilter().forEach(x=> bodegas.push(x));
    }
    if (this.filterValues.zonaLocalizacion !== "") {
      this.performZonaFilter().forEach(x=> bodegas.push(x));
    }

    return [...new Set(bodegas)].sort((a, b) => (a.nombreBodega < b.nombreBodega ? -1 : 1));
  }

  performNombreFilter(): Bodega[] {
    return this.bodegas.filter((bodega: Bodega) =>
      bodega.nombreBodega.includes(this.filterValues.nombre));
  }

  performUbicacionFilter(): Bodega[] {
    return this.bodegas.filter((bodega: Bodega) =>
      bodega.ubicacionPais.includes(this.filterValues.ubicacionPais));
  }

  performZonaFilter(): Bodega[] {
    return this.bodegas.filter((bodega: Bodega) =>
      bodega.zonaLocalizacion.includes(this.filterValues.zonaLocalizacion));
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
      if (p['ubicacionPais'] || p['nombre'] || p['zonaLocalizacion']) {
        setTimeout(() => {
          if (p['nombre']) {
            this.nombreFilter = p['nombre']
          }
          if (p['ubicacionPais']) {
            this.ubicacionPaisFilter = p['ubicacionPais']
          }
          if (p['zonaLocalizacion']) {
            this.zonaLocalizacionFilter = p['zonaLocalizacion']
          }
        }, 1000);
      }
    });
    this.sub = this.bodegaService.getBodegas().subscribe(bodegas => {
      this.bodegas = bodegas.sort((a, b) => (a.nombreBodega < b.nombreBodega ? -1 : 1));
      this.filteredBodegas = this.bodegas;
   });

    this.zonaLocalizaciones = [
      ZonaLocalizacion.Centro,
      ZonaLocalizacion.Sur,
      ZonaLocalizacion.Oriente,
      ZonaLocalizacion.Occidente,
      ZonaLocalizacion.Norte
    ]
  }

}
