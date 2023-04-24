import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Bodega } from '../../../models/bodega';
import { BodegaService } from '../bodega.service';
import { ActivatedRoute, Router } from '@angular/router'
import { Ciudades }from '../../../models/ciudades.enum';
import { Paises }from '../../../models/paises.enum';
import { ZonaLocalizacion } from 'src/models/zonaLocalizacion.enum';


@Component({
  selector: 'app-bodega',
  templateUrl: './bodega-list.component.html',
  styleUrls: ['./bodega-list.component.css'],
})
export class BodegaListComponent implements OnInit{
  imageWidth: number = 250;
  imageHeight: number = 230;
  scroll: boolean = false;
  fixedStyle: object = {"position": "fixed"};
  display: object = {"display": "none"};
  sub: Subscription = new Subscription;
  bodegas: Bodega[] = [];
  ciudades: Ciudades[] = [];
  paises: Paises[] = [];
  zonas: string[] = [];
  filteredBodegas: Bodega[] = [];
  filterValues: { [filter: string]: string } = {
    nombre: "",
    pais: "",
    ciudad: "",
    zona: ""
  };

  openForm: boolean = false;
  private _nombreFilter: string = '';
  actbtn: string | null = null;
  selected: boolean = false;
  selectedBodega: Bodega  = new Bodega(
    "123",
    "Example Bodega",
    Paises.Colombia,
    Ciudades.Cali,
    "Centro",
    3.5,
    0.5,
    3.0,
  );


  get nombreFilter(): string {
    return this._nombreFilter;
  }
  set nombreFilter(value: string) {
    this._nombreFilter = value;
    this.filterValues['nombre'] = value
    this.filteredBodegas = this.performFilters();
  }

  private _paisFilter: Paises  = Paises.Colombia;
  get paisFilter(): Paises {
    return this._paisFilter;
  }
  set paisFilter(value: Paises) {
    this._paisFilter = value;
    this.filterValues['pais'] = value
    this.filteredBodegas = this.performFilters();
  }

  private _ciudadFilter: Ciudades = Ciudades.Cali;
  get ciudadFilter(): Ciudades {
    return this._ciudadFilter;
  }
  set ciudadFilter(value: Ciudades) {
    this._ciudadFilter = value;
    this.filterValues['ciudad'] = value
    this.filteredBodegas = this.performFilters();
  }

  private _zonaFilter: ZonaLocalizacion  = ZonaLocalizacion.Centro;
  get zonaFilter(): ZonaLocalizacion {
    return this._zonaFilter;
  }
  set zonaFilter(value: ZonaLocalizacion) {
    this._zonaFilter = value;
    this.filterValues['zona'] = value
    this.filteredBodegas = this.performFilters();
  }

  constructor(private bodegaService: BodegaService,
    public router: Router,
    public route: ActivatedRoute) { }

  performFilters(): Bodega[] {
    let bodegas: Bodega[] = []

    if (this.filterValues['nombre'] === "" && this.filterValues['pais'] === "" &&
        this.filterValues['ciudad'] === "" && this.filterValues['zona'] === "") {
      return bodegas = this.bodegas;
    }

    if (this.filterValues['nombre'] !== "") {
      this.performNombreFilter().forEach(x=> bodegas.push(x));
    }

    if (this.filterValues['pais'] !== "") {
      this.performPaisFilter().forEach(x=> bodegas.push(x));
    }

    if (this.filterValues['ciudad'] !== "") {
      this.performCiudadFilter().forEach(x=> bodegas.push(x));
    }

    if (this.filterValues['zona'] !== "") {
      this.performZonaFilter().forEach(x=> bodegas.push(x));
    }

    return [...new Set(bodegas)].sort((a, b) => (a.nombreBodega < b.nombreBodega ? -1 : 1));
  }

  performNombreFilter(): Bodega[] {
    return this.bodegas.filter((bodega: Bodega) =>
      bodega.nombreBodega.includes(this.filterValues['nombre']));
  }

  performPaisFilter(): Bodega[] {
    return this.bodegas.filter((bodega: Bodega) =>
      bodega.ubicacionPais.includes(this.filterValues['pais']));
  }

  performCiudadFilter(): Bodega[] {
    return this.bodegas.filter((bodega: Bodega) =>
      bodega.ubicacionCiudad.includes(this.filterValues['ciudad']));
  }

  performZonaFilter(): Bodega[] {
    return this.bodegas.filter((bodega: Bodega) =>
      bodega.zonaLocalizacion.includes(this.filterValues['zona']));
  }

  onSelected(c: Bodega) {
    this.selected = true;
    this.selectedBodega = c;
  }
  hideDetails(): void {
    this.selected = false; // reset selected to false to hide product details
    this.actbtn = null; // reset actbtn to null to unselect the active button
  }

  showForm() {
    this.openForm = true;
  }


  hideForm() {
    this.openForm = false;
  }

  refresh() {
    window.location.reload();
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      if (p['pais'] || p['nombre'] || p['ciudad'] || p['zona']) {
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
          if (p['zona']) {
            this.zonaFilter = p['zona']
          }
        }, 1000);
      }
    });
    this.sub = this.bodegaService.getBodegas().subscribe(bodegas => {
      this.bodegas = bodegas.sort((a, b) => a.idBodega.localeCompare(b.idBodega));
      this.filteredBodegas = this.bodegas;
   });

    this.ciudades = [
      Ciudades.Arequipa,
      Ciudades.BSAS,
      Ciudades.Bogota,
      Ciudades.Cali,
      Ciudades.Chiclayo,
      Ciudades.Cusco,
      Ciudades.Esmeraldas,
      Ciudades.Guayaquil,
      Ciudades.Lima,
      Ciudades.Loja,
      Ciudades.Medellin,
      Ciudades.Mendoza,
      Ciudades.Mexico,
      Ciudades.Neiva,
      Ciudades.Piura,
      Ciudades.Quito,
      Ciudades.Rosario,
      Ciudades.Santiago,
      Ciudades.Valdivia
    ]

    this.paises = [
      Paises.Argentina,
      Paises.Chile,
      Paises.Colombia,
      Paises.Ecuador,
      Paises.Peru,
    ]

    this.zonas = [
      ZonaLocalizacion.Centro,
      ZonaLocalizacion.Norte,
      ZonaLocalizacion.Occidente,
      ZonaLocalizacion.Oriente,
      ZonaLocalizacion.Sur,
    ]

  }

}

