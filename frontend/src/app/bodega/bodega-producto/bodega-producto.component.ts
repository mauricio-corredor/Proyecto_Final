import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bodega } from '../../../models/bodega';
import { BodegaService } from '../bodega.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { Producto } from 'src/models/producto';
import { ProductoService } from '../../producto/producto.service';
import { AppComponent } from 'src/app/app.component';
import { TokenService } from 'src/app/services/token.service';
import { SharedService } from 'src/app/shared/shared.service';
import { TipoProducto } from 'src/models/tipoProducto1.enum';


@Component({
  selector: 'app-bodega-producto',
  templateUrl: './bodega-producto.component.html',
  styleUrls: ['./bodega-producto.component.css']
})
export class BodegaProductoComponent implements OnInit {

  @Input() bodegaProd: Bodega  = new Bodega(
    "123",
    "Example Product",
    "https://example.com/product.jpg",
    "Example Supplier",
    "Example Manufacturer",
    20,
    15,
    9.99
  );

  productos: Producto[]  = [];
  tipos: TipoProducto[] = [];

  bodegas: Bodega[] = [];
  totalRoom: number =0;
  qtyProducts: number =0;
  capacidadBodega: number = 0;

  cells: Array<{ row: number, col: number, color: string, occupied: boolean }> = [];

  selected: boolean = false;
  actbtn: string | null = null;
  bodegaId: string = '';
  public language: string = 'en';
  sub: Subscription = new Subscription;
  subProd: Subscription = new Subscription;
  esAdmin: boolean | undefined;

  country: string ='';
  imageWidth: number = 250;
  imageHeight: number = 230;
  scroll: boolean = false;
  fixedStyle: object = {"position": "fixed"};
  display: object = {"display": "none"};
  proveedores: string[] = [];
  codigos: string[] = [];
  filteredProductos: Producto[] = [];
  filterValues: { [filter: string]: string } = {
    descripcion: "",
    proveedor: "",
    tipo: "",
    codigo: ""
  };
  activeIds: string[] = []; // add this property to the class
  //selectedCurrency: string = 'USD';
  exchangeRate$!: Observable<number>;


  openForm: boolean = false;
  private _descripcionFilter: string = '';
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

  private _tipoFilter!: TipoProducto;
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

  constructor(private bodegaService: BodegaService,
    private productoService: ProductoService,
    public router: Router,
    public route: ActivatedRoute,
    public route1: ActivatedRoute,
    private appComponent: AppComponent,
    private sharedService: SharedService,
    private tokenService: TokenService,
    public translate: TranslateService
  ){
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
    const productVolume: number = Number(c.volumenProducto);
    this.qtyProducts = Math.round(this.bodegaProd.CapacidadDisponible/productVolume);
    console.log('cantidad de productos', this.qtyProducts);

  }


    getBodegaProd() {
      this.bodegaService.getBodegaById(this.bodegaId).subscribe(c => {
        this.bodegaProd = c;
      });
    }

    hideDetails(): void {
      this.selected = false; // reset selected to false to hide product details
      this.actbtn = null; // reset actbtn to null to unselect the active button
    }

    refresh() {
      window.location.reload();
    }

    isActive(productId: string) {
      return this.activeIds.indexOf(productId) !== -1;
    }



    ngOnInit(): void {
      this.esAdmin = this.tokenService.getEsRolUsuarioAdmin();


      this.sharedService.selectedCountry$.subscribe(country => {
        this.country = country;
        console.log('Selected country:', this.country);
      });
      const storedLanguage = localStorage.getItem('language');
      if (storedLanguage) {
        this.language = storedLanguage;
      }
      this.translate.use(this.language);
      this.route1.queryParams.subscribe(p => {
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

      this.route.params.subscribe(p => {
        this.bodegaService.getBodegaById(p['id']).subscribe(a => {
          this.bodegaProd = a
          this.capacidadBodega = this.bodegaProd.CapacidadDisponible;
        });

        this.sub = this.bodegaService.getBodegas().subscribe(bodegas => {
          this.bodegas = bodegas.sort((a, b) => a.idBodega.localeCompare(b.idBodega));
        });

      })


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
