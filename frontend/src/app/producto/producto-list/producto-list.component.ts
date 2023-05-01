import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoProducto } from 'src/models/tipoProducto1.enum';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../../shared/shared.service';
import { Observable } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { AppComponent } from './../../app.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit{
  country: string ='';
  imageWidth: number = 250;
  imageHeight: number = 230;
  scroll: boolean = false;
  fixedStyle: object = {"position": "fixed"};
  display: object = {"display": "none"};
  sub: Subscription = new Subscription;
  productos: Producto[] = [];
  proveedores: string[] = [];
  tipos: TipoProducto[] = [];
  codigos: string[] = [];
  filteredProductos: Producto[] = [];
  filterValues: { [filter: string]: string } = {
    descripcion: "",
    proveedor: "",
    tipo: "",
    codigo: ""
  };
  //selectedCurrency: string = 'USD';
  exchangeRate$!: Observable<number>;


  openForm: boolean = false;
  private _descripcionFilter: string = '';
  actbtn: string | null = null;
  selected: boolean = false;
  selectedProducto: Producto  = new Producto(
    "123",
    "Example Product",
    "https://example.com/product.jpg",
    "Example Supplier",
    "Example Manufacturer",
    "10 oz",
    "Example Type",
    "2024-01-01",
    "ABC123",
    9.99
  );

  get descripcionFilter(): string {
    return this._descripcionFilter;
  }
  set descripcionFilter(value: string) {
    this._descripcionFilter = value;
    this.filterValues['descripcion'] = value
    this.filteredProductos = this.performFilters();
  }

  private _proveedorFilter: string  = '';
  get proveedorFilter(): string {
    return this._proveedorFilter;
  }
  set proveedorFilter(value: string) {
    this._proveedorFilter = value;
    this.filterValues['proveedor'] = value
    this.filteredProductos = this.performFilters();
  }

  private _tipoFilter: TipoProducto = TipoProducto.Perecederos;
  get tipoFilter(): TipoProducto {
    return this._tipoFilter;
  }
  set tipoFilter(value: TipoProducto) {
    this._tipoFilter = value;
    this.filterValues['tipo'] = value
    this.filteredProductos = this.performFilters();
  }

  private _codigoFilter: string  = '';
  get codigoFilter(): string {
    return this._codigoFilter;
  }
  set codigoFilter(value: string) {
    this._codigoFilter = value;
    this.filterValues['codigo'] = value
    this.filteredProductos = this.performFilters();
  }

  constructor(private appComponent: AppComponent,
    private sharedService: SharedService,
    private productoService: ProductoService,
    public router: Router,
    public route: ActivatedRoute,
    public translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');

  }



  performFilters(): Producto[] {
    let productos: Producto[] = []

    if (this.filterValues['descripcion'] === "" && this.filterValues['proveedor'] === "" &&
        this.filterValues['tipo'] === "" && this.filterValues['codigo'] === "") {
      return productos = this.productos;
    }

    if (this.filterValues['descripcion'] !== "") {
      this.performDescripcionFilter().forEach(x=> productos.push(x));
    }

    if (this.filterValues['proveedor'] !== "") {
      this.performProveedorFilter().forEach(x=> productos.push(x));
    }

    if (this.filterValues['tipo'] !== "") {
      this.performTipoFilter().forEach(x=> productos.push(x));
    }

    if (this.filterValues['codigo'] !== "") {
      this.performCodigoFilter().forEach(x=> productos.push(x));
    }

    return [...new Set(productos)].sort((a, b) => (a.descripcionProducto < b.descripcionProducto ? -1 : 1));
  }

  performDescripcionFilter(): Producto[] {
    return this.productos.filter((producto: Producto) =>
      producto.descripcionProducto.includes(this.filterValues['descripcion']));
  }

  performProveedorFilter(): Producto[] {
    return this.productos.filter((producto: Producto) =>
      producto.proveedor.includes(this.filterValues['proveedor']));
  }

  performTipoFilter(): Producto[] {
    return this.productos.filter((producto: Producto) =>
      producto.tipoProducto.includes(this.filterValues['tipo']));
  }

  performCodigoFilter(): Producto[] {
    return this.productos.filter((producto: Producto) =>
      producto.codigoProducto.includes(this.filterValues['codigo']));
  }

  onSelected(c: Producto) {
    this.selected = true;
    this.selectedProducto = c;
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
    this.sharedService.selectedCountry$.subscribe(country => {
      this.country = country;
      console.log('Selected country:', this.country);
      // do any other processing that depends on the selectedCountry value
    });
    console.log('Selected country from producto:', this.country);
    this.route.queryParams.subscribe(p => {
      if (p['proveedor'] || p['descripcion'] || p['tipo'] || p['codigo']) {
        setTimeout(() => {
          if (p['descripcion']) {
            this.descripcionFilter = p['descripcion']
          }
          if (p['proveedor']) {
            this.proveedorFilter = p['proveedor']
          }
          if (p['tipo']) {
            this.tipoFilter = p['tipo']
          }
          if (p['codigo']) {
            this.codigoFilter = p['codigo']
          }
        }, 1000);
      }
    });
    this.sub = this.productoService.getProductos().subscribe(productos => {
      this.productos = productos.sort((a, b) => a.idProducto.localeCompare(b.idProducto));
      this.filteredProductos = this.productos;
   });

    this.tipos = [
      TipoProducto.Cereales,
      TipoProducto.Frutas,
      TipoProducto.Juguetes,
      TipoProducto.Perecederos,
      TipoProducto.Verduras
    ]



  }

}
