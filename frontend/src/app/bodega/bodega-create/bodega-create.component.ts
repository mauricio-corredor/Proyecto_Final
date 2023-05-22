import { tap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { BodegaService } from 'src/app/bodega/bodega.service';
import { Bodega } from 'src/models/bodega';
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paises } from 'src/models/paises.enum';
import { Ciudades } from 'src/models/ciudades.enum';
import { ZonaLocalizacion } from 'src/models/zonaLocalizacion.enum';
import { fakeAsync } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bodega-create',
  templateUrl: './bodega-create.component.html',
  styleUrls: ['./bodega-create.component.css']
})
export class BodegaCreateComponent implements OnInit {
  bodegaForm: FormGroup = new FormGroup({});
  control = new FormControl('initial value', [Validators.required, Validators.minLength(3)]); // validators passed in as additional arguments

  url: string = '';
  ciudades = Object.values(Ciudades);
  show: boolean = false;
  paises = Object.values(Paises);
  zonas = Object.values(ZonaLocalizacion); // array with all the values of TipoBodega enum
  bodega: Bodega = new Bodega('', '', '', '', '', 0, 0, 0); // initialize a new product object

  @Input()
  openForm: boolean = false;
  @Output() cancelForm = new EventEmitter();


  constructor(private formBuilder: FormBuilder,
    private bodegaService: BodegaService,
    private router: Router,
    private toast: ToastrService,
    public translate: TranslateService) {
  }

  hideForm() {
    this.cancelForm.emit()
  }


  createBodega(newBodega: Bodega) {
    this.bodegaService.addBodega(newBodega).subscribe(() => {
      this.toast.success(`Bodega created`);
      this.hideForm()
    }, err => {
      this.toast.error(err, 'Error');
    });
  }


  ngOnInit(): void {

    this.bodegaForm = this.formBuilder.group({
      nombreBodega: ['', [Validators.required, Validators.minLength(1)]],
      ubicacionPais: ['', Validators.required],
      ubicacionCiudad: ['', Validators.required],
      zonaLocalizacion: ['', Validators.required],
      capacidadVolumen: ['', [Validators.required, Validators.minLength(1)]],
      capacidadUsada: ['', Validators.required],
      CapacidadDisponible: ['', Validators.required]
    });
  }

}
