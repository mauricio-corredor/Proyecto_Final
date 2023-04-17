import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoProducto } from 'src/models/tipoProducto1.enum';


@Component({
  selector: 'app-producto',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit{
  imageWidth: number = 250;
  imageHeight: number = 230;
  scroll: boolean;
  fixedStyle: object = {"position": "fixed"};
  display: object = {"display": "none"};
  sub: Subscription;
  productos: Producto[];
  proveedores: string[];
  tipos: TipoProducto[];
  codigos: string[];
  filteredProductos: Producto[] = [];
  filterValues: { [filter: string]: string } = {
    descripcion: "",
    proveedor: "",
    tipo: "",
    codigo: ""
  };

  openForm: boolean = false;

  private _descripcionFilter: string;
  get descripcionFilter(): string {
    return this._descripcionFilter;
  }
  set descripcionFilter(value: string) {
    this._descripcionFilter = value;
    this.filterValues.descripcion = value
    this.filteredProductos = this.performFilters();
  }

  private _proveedorFilter: string;
  get proveedorFilter(): string {
    return this._proveedorFilter;
  }
  set proveedorFilter(value: string) {
    this._proveedorFilter = value;
    this.filterValues.proveedor = value
    this.filteredProductos = this.performFilters();
  }

  private _tipoFilter: TipoProducto;
  get tipoFilter(): TipoProducto {
    return this._tipoFilter;
  }
  set tipoFilter(value: TipoProducto) {
    this._tipoFilter = value;
    this.filterValues.tipo = value
    this.filteredProductos = this.performFilters();
  }

  private _codigoFilter: string;
  get codigoFilter(): string {
    return this._codigoFilter;
  }
  set codigoFilter(value: string) {
    this._codigoFilter = value;
    this.filterValues.codigo = value
    this.filteredProductos = this.performFilters();
  }

  constructor(private productoService: ProductoService,
    public router: Router,
    public route: ActivatedRoute) { }

  performFilters(): Producto[] {
    let productos: Producto[] = []

    if (this.filterValues.descripcion === "" && this.filterValues.proveedor === "" &&
        this.filterValues.tipo === "" && this.filterValues.codigo === "") {
      return productos = this.productos;
    }

    if (this.filterValues.descripcion !== "") {
      this.performDescripcionFilter().forEach(x=> productos.push(x));
    }

    if (this.filterValues.proveedor !== "") {
      this.performProveedorFilter().forEach(x=> productos.push(x));
    }

    if (this.filterValues.tipo !== "") {
      this.performTipoFilter().forEach(x=> productos.push(x));
    }

    if (this.filterValues.codigo !== "") {
      this.performCodigoFilter().forEach(x=> productos.push(x));
    }

    return [...new Set(productos)].sort((a, b) => (a.descripcionProducto < b.descripcionProducto ? -1 : 1));
  }

  performDescripcionFilter(): Producto[] {
    return this.productos.filter((producto: Producto) =>
      producto.descripcionProducto.includes(this.filterValues.descripcion));
  }

  performProveedorFilter(): Producto[] {
    return this.productos.filter((producto: Producto) =>
      producto.proveedor.includes(this.filterValues.proveedor));
  }

  performTipoFilter(): Producto[] {
    return this.productos.filter((producto: Producto) =>
      producto.tipoProducto.includes(this.filterValues.tipo));
  }

  performCodigoFilter(): Producto[] {
    return this.productos.filter((producto: Producto) =>
      producto.codigoProducto.includes(this.filterValues.codigo));
  }

  onSelected(productoId: number): void {
    this.router.navigate(['/productos/' + productoId]);
  }

  showForm() {
    this.openForm = true;
  }

  hideForm() {
    this.openForm = false;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      if (p['proveedor'] || p['descripcion'] || p['tipo'] || p['codigo']) {
        setTimeout(() => {
          if (p['descripcion']) {
            this.proveedorFilter = p['descripcion']
          }
          if (p['proveedor']) {
            this.tipoFilter = p['proveedor']
          }
          if (p['tipo']) {
            this.descripcionFilter = p['tipo']
          }
          if (p['codigo']) {
            this.descripcionFilter = p['codigo']
          }
        }, 1000);
      }
    });
    this.sub = this.productoService.getProductos().subscribe(productos => {
      this.productos = productos.sort((a, b) => (a.descripcionProducto < b.descripcionProducto ? -1 : 1));
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
