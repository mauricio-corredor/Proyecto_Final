import { Component, Input, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Orden } from '../../../models/orden';
import { OrdenService } from '../orden.service';
import { EstadoOrden } from 'src/models/estadoOrden';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../shared/shared.service';
import { AppComponent } from './../../app.component';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden-list.component.html',
  styleUrls: ['./orden-list.component.css']
})
export class OrdenListComponent implements OnInit{

  esAdmin: boolean | undefined;

  country: string ='';
  imageWidth: number = 250;
  imageHeight: number = 230;
  scroll: boolean = false;
  fixedStyle: object = {"position": "fixed"};
  display: object = {"display": "none"};
  sub: Subscription = new Subscription;
  ordenes: Orden[] = [];
  productos: string[] = [];
  estados: EstadoOrden[] = [];
  clientes: string[] = [];
  paises: string[] = [];
  vendedores: string[] = [];
  codigos: string[] = [];
  filteredOrdenes: Orden[] = [];
  filterValues: { [filter: string]: string } = {
    cliente: "",
    producto: "",
    vendedor: "",
    pais: "",
    estado: ""
  };
  activeIds: string[] = []; // add this property to the class
  //selectedCurrency: string = 'USD';
  exchangeRate$!: Observable<number>;
  public language: string = 'en';

  openForm: boolean = false;
  actbtn: string | null = null;
  selected: boolean = false;
  selectedOrden!: Orden;


  private _clienteFilter: string = '';
  get clienteFilter(): string {
    return this._clienteFilter;
  }
  set clienteFilter(value: string) {
    this._clienteFilter = value;
    this.filterValues['cliente'] = value
    this.filteredOrdenes = this.performFilters();
  }

  private _productoFilter: string  = '';
  get productoFilter(): string {
    return this._productoFilter;
  }
  set productoFilter(value: string) {
    this._productoFilter = value;
    this.filterValues['producto'] = value
    this.filteredOrdenes = this.performFilters();
  }


  private _vendedorFilter: string = '';
  get vendedorFilter(): string {
    return this._vendedorFilter;
  }
  set vendedorFilter(value: string) {
    this._vendedorFilter = value;
    this.filterValues['vendedor'] = value
    this.filteredOrdenes = this.performFilters();
  }

  private _paisFilter: string = '';
  get paisFilter(): string {
    return this._paisFilter;
  }
  set paisFilter(value: string) {
    this._paisFilter = value;
    this.filterValues['pais'] = value
    this.filteredOrdenes = this.performFilters();
  }

  private _estadoFilter!: EstadoOrden;
  get estadoFilter(): EstadoOrden {
    return this._estadoFilter;
  }
  set estadoFilter(value: EstadoOrden) {
    this._estadoFilter = value;
    this.filterValues['estado'] = value
    this.filteredOrdenes = this.performFilters();
  }

  constructor(private appComponent: AppComponent,
    private sharedService: SharedService,
    private ordenService: OrdenService,
    private tokenService: TokenService,
    public router: Router,
    public route: ActivatedRoute,
    public translate: TranslateService
  ) {

  }

  performFilters(): Orden[] {
    let ordenes: Orden[] = []

    if (this.filterValues['cliente'] === "" && this.filterValues['producto'] === "" &&
          this.filterValues['vendedor'] === "" && this.filterValues['estado'] === "" &&
          this.filterValues['pais'] === "") {
      return ordenes = this.ordenes;
    }

    if (this.filterValues['cliente'] !== "") {
      this.performClienteFilter().forEach(x=> ordenes.push(x));
    }

    if (this.filterValues['producto'] !== "") {
      this.performProductoFilter().forEach(x=> ordenes.push(x));
    }


    if (this.filterValues['vendedor'] !== "") {
      this.performVendedorFilter().forEach(x=> ordenes.push(x));
    }

    if (this.filterValues['pais'] !== "") {
      this.performPaisFilter().forEach(x=> ordenes.push(x));
    }

    if (this.filterValues['estado'] !== "") {
      this.performEstadoFilter().forEach(x=> ordenes.push(x));
    }

    return [...new Set(ordenes)].sort((a, b) => (a.numeroOrden < b.numeroOrden ? -1 : 1));
  }

  performClienteFilter(): Orden[] {
    let filter = this.ordenes.filter((orden: Orden) =>
      orden.clienteDetalle.nombre.includes(this.filterValues['cliente'])
    );
    return this.filterValues['ordenes'] === '' ? this.ordenes : filter;
  }

  performVendedorFilter(): Orden[] {
    let filter = this.ordenes.filter((orden: Orden) =>
      orden.vendedorDetalle.nombre.includes(this.filterValues['vendedor'])
    );
    return this.filterValues['ordenes'] === '' ? this.ordenes : filter;
  }

  performPaisFilter(): Orden[] {
    let filter = this.ordenes.filter((orden: Orden) =>
      orden.vendedorDetalle.pais.includes(this.filterValues['pais'])
    );
    return this.filterValues['ordenes'] === '' ? this.ordenes : filter;
  }


  performProductoFilter(): Orden[] {
    let filter = this.ordenes.filter((orden: Orden) =>
    orden.productosOrden.map(p =>p.descripcionProducto).includes(this.filterValues['producto']));
    return this.filterValues['orden'] === '' ? this.ordenes : filter;
  }

  performEstadoFilter(): Orden[] {
    let filter = this.ordenes.filter((orden: Orden) =>
      orden.estadoOrden.includes(this.filterValues['estado'])
    );
    return this.filterValues['ordenes'] === '' ? this.ordenes : filter;
  }

  onSelected(c: Orden) {
    this.selected = true;
    this.selectedOrden = c;
    this.router.navigate(['/orden/', c.idOrden]);

  }

  getBodegaProd(): Orden[]{
    return this.ordenes;
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

  isActive(productId: string) {
    return this.activeIds.indexOf(productId) !== -1;
  }

  refresh() {
    // Reload the page
    window.location.reload();
  }

  ngOnInit(): void {

    this.esAdmin = this.tokenService.getEsRolUsuarioAdmin();

    this.sharedService.selectedCountry$.subscribe(country => {
      this.country = country;
    });
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      this.language = storedLanguage;
    }
    this.translate.use(this.language);
    this.route.queryParams.subscribe(p => {
      if (p['cliente'] || p['producto'] || p['vendedor'] || p['pais'] || p['estado']) {
        setTimeout(() => {
          if (p['cliente']) {
            this.clienteFilter = p['cliente']
          }
          if (p['producto']) {
            this.productoFilter = p['producto']
          }
          if (p['vendedor']) {
            this.vendedorFilter = p['vendedor']
          }
          if (p['pais']) {
            this.paisFilter = p['pais']
          }
          if (p['estado']) {
            this.estadoFilter = p['estado']
          }
        }, 1000);
      }
    });
    this.sub = this.ordenService.getOrdenes().subscribe(ordenes => {
      this.ordenes = ordenes.sort((a, b) => a.numeroOrden.localeCompare(b.numeroOrden));
      this.filteredOrdenes = this.ordenes;
      this.productos = [...new Set(this.ordenes.map(a => a.productosOrden).map(p => p.map(x=> x.descripcionProducto)).map(n=> n[0]))].sort();
      this.clientes = [...new Set(this.ordenes.map(a => a.clienteDetalle).flatMap(p => p['map']((x: any) => x)))].sort();
      this.vendedores = [...new Set(this.ordenes.map(a => a.vendedorDetalle).flatMap(p => p['map']((x: any) => x)))].sort();

   });

    this.estados = [
      EstadoOrden.Cancelada,
      EstadoOrden.En_Proceso,
      EstadoOrden.Procesada,
    ]
  }
}
