import { tap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ProductoService } from 'src/app/producto/producto.service';
import { Producto } from 'src/models/producto';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoProducto } from 'src/models/tipoProducto1.enum';
import { Paises } from 'src/models/paises.enum';
import { Ciudades } from 'src/models/ciudades.enum';
import { ZonaLocalizacion } from 'src/models/zonaLocalizacion.enum';
import { fakeAsync } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent implements OnInit {
  productoForm: FormGroup = new FormGroup({});
  control = new FormControl('initial value', [Validators.required, Validators.minLength(3)]); // validators passed in as additional arguments

  url: string = '';
  ciudades: Ciudades[] = [];
  show: boolean = false;
  paises: Paises[] = [];
  tipos = Object.values(TipoProducto); // array with all the values of TipoProducto enum
  producto: Producto = new Producto('', '', '', '', '', '', '', '', '', 0); // initialize a new product object

  @Input()
  openForm: boolean = false;
  @Output() cancelForm = new EventEmitter();


    constructor(private formBuilder: FormBuilder,
      private productoService: ProductoService,
      public router: Router,
      private toast: ToastrService,
      public translate: TranslateService
    ) {
      this.translate.setDefaultLang('en');
    }

  hideForm() {
    this.cancelForm.emit()
  }

  onTypingUrl() {
    this.url = (<HTMLInputElement>document.getElementById("producto-imagen")).value;
  }

  clearUrl(_$event: any) {
    (<HTMLInputElement>document.getElementById("producto-imagen")).value = "";
    this.url = '';
  }

  createProducto(newProducto: Producto) {
    this.productoService.addProducto(newProducto).subscribe(() => {
      this.toast.success(`Producto created`);
      this.hideForm()
    }, err => {
      this.toast.error(err, 'Error');
    });
  }

  showSuccess(c: Producto) {
    this.toast.success(`Producto created successfully!`);
  }

  ngOnInit(): void {
    this.tipos = [
      TipoProducto.Cereales,
      TipoProducto.Frutas,
      TipoProducto.Juguetes,
      TipoProducto.Perecederos,
      TipoProducto.Verduras
    ]
    console.log('tipos:', this.tipos);
    this.ciudades = [
      Ciudades.Bogota,
      Ciudades.Arequipa,
      Ciudades.Lima,
      Ciudades.Quito,
      Ciudades.Santiago,
      Ciudades.BSAS,
      Ciudades.Cali,
    ]
    this.productoForm = this.formBuilder.group({
      descripcionProducto: ['', [Validators.required, Validators.minLength(1)]],
      imagenProducto: ['', Validators.required],
      proveedor: ['', Validators.required],
      fabricanteProducto: ['', Validators.required],
      volumenProducto: ['', [Validators.required, Validators.minLength(1)]],
      tipoProducto: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      codigoProducto: ['', Validators.required],
      precioProducto: ['', Validators.required]
    });
  }
}
