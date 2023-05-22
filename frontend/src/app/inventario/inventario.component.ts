import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Inventario } from '../../models/inventario';
import { InventarioService } from './inventario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../shared/shared.service';
import { Observable } from 'rxjs';
import { Paises } from './../../models/paises.enum';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit{
  country: string ='';
  imageWidth: number = 250;
  imageHeight: number = 230;
  scroll: boolean = false;
  fixedStyle: object = {"position": "fixed"};
  display: object = {"display": "none"};
  sub: Subscription = new Subscription;
  inventarios: Inventario[] = [];
  proveedores: string[] = [];
  paises = Object.values(Paises);
  filteredInventarios: Inventario[] = [];
  filterValues: { [filter: string]: string } = {
    pais: ""
  };
  //selectedCurrency: string = 'USD';
  exchangeRate$!: Observable<number>;
  public language: string = 'en';


  openForm: boolean = false;
  actbtn: string | null = null;
  selected: boolean = false;
  selectedInventario: Inventario  = new Inventario(
    "123",
    "123",
    "",
    20,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    500
  );


  private _paisFilter!: Paises;
  get paisFilter(): Paises {
    return this._paisFilter;
  }
  set paisFilter(value: Paises) {
    this._paisFilter = value;
    this.filterValues['pais'] = value
    this.filteredInventarios = this.performFilters();
  }

  private _proveedorFilter: string  = '';
  get proveedorFilter(): string {
    return this._proveedorFilter;
  }
  set proveedorFilter(value: string) {
    this._proveedorFilter = value;
    this.filterValues['proveedor'] = value
    this.filteredInventarios = this.performFilters();
  }

  private _fabricanteFilter: string  = '';
  get fabricanteFilter(): string {
    return this._fabricanteFilter;
  }
  set fabricanteFilter(value: string) {
    this._proveedorFilter = value;
    this.filterValues['fabricante'] = value
    this.filteredInventarios = this.performFilters();
  }

  private _codigoFilter: string  = '';
  get codigoFilter(): string {
    return this._codigoFilter;
  }
  set codigoFilter(value: string) {
    this._codigoFilter = value;
    this.filterValues['codigo'] = value
    this.filteredInventarios = this.performFilters();
  }

  constructor(private sharedService: SharedService,
    private inventarioService: InventarioService,
    public router: Router,
    public route: ActivatedRoute,
    public translate: TranslateService
  ) {
  }


  performFilters(): Inventario[] {
    let inventarios: Inventario[] = []

    if (this.filterValues['pais'] !== "") {
      this.performPaisFilter().forEach(x=> inventarios.push(x));
    }

    if (this.filterValues['proveedor'] !== "") {
      this.performProveedorFilter().forEach(x=> inventarios.push(x));
    }
    if (this.filterValues['fabricante'] !== "") {
      this.performFabricanteFilter().forEach(x=> inventarios.push(x));
    }

    if (this.filterValues['codigo'] !== "") {
      this.performCodigoFilter().forEach(x=> inventarios.push(x));
    }

    return [...new Set(inventarios)].sort((a, b) => (a.id < b.id ? -1 : 1));
  }

  performPaisFilter(): Inventario[] {
    return this.inventarios.filter((inventario: Inventario) =>
      inventario.paisInventario.includes(this.filterValues['pais']));
  }

  performProveedorFilter(): Inventario[] {
    return this.inventarios.filter((inventario: Inventario) =>
      inventario.proveedor.includes(this.filterValues['proveedor']));
  }

  performFabricanteFilter(): Inventario[] {
    return this.inventarios.filter((inventario: Inventario) =>
      inventario.fabricanteProducto.includes(this.filterValues['fabricante']));
  }

  performCodigoFilter(): Inventario[] {
    return this.inventarios.filter((inventario: Inventario) =>
    inventario.codigoProducto.includes(this.filterValues['codigo']));
  }

  onSelected(c: Inventario) {
    this.selected = true;
    this.selectedInventario = c;
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
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      this.language = storedLanguage;
    }
    this.translate.use(this.language);
    this.route.queryParams.subscribe(p => {
      if (p['pais'] || p['proveedor'] || p['ciudad'] || p['zona']) {
        setTimeout(() => {

          if (p['pais']) {
            this.paisFilter = p['pais']
          }

          if (p['proveedor']) {
            this.proveedorFilter = p['proveedor']
          }

          if (p['codigo']) {
            this.codigoFilter = p['codigo']
          }

        }, 1000);
      }
    });
    this.sub = this.inventarioService.getInventarios().subscribe(inventarios => {
      this.inventarios = inventarios.sort((a, b) => a.id.localeCompare(b.id));
      this.filteredInventarios = this.inventarios;

   });
   console.log('Inventory list: ', this.inventarios.length);


  }

}
