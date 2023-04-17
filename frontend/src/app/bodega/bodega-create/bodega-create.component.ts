import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { Bodega } from 'src/models/bodega';
import { BodegaService } from '../bodega.service';
import { ZonaLocalizacion } from 'src/models/zonaLocalizacion.enum';




@Component({
  selector: 'app-bodega-create',
  templateUrl: './bodega-create.component.html',
  styleUrls: ['./bodega-create.component.css']
})
export class BodegaCreateComponent implements OnInit {
  bodegaForm: FormGroup;
  url: string;
  zonas: ZonaLocalizacion[];
  bodegas: Bodega[];


  @Input() openForm: boolean;
  @Output() cancelForm = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private bodegaService: BodegaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.bodegaForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      telephone: ["", [Validators.required, Validators.minLength(7), Validators.pattern(/^[0-9]\d*$/)]],
      email: ["", [Validators.required, Validators.email]]
    });
  }


  createBodega(newBodega: Bodega) {
    this.bodegaService.addBodega(newBodega).subscribe(bodega => {
      this.showSuccess(newBodega);
    });
    this.bodegaForm.reset();
  }

  showSuccess(c: Bodega) {
    this.toastr.success($localize`Bodega created successfully!`);
  }

  cancelCreation() {
    this.bodegaForm.reset();
    this.router.navigate(['/bodegas'])
  }


  hideForm() {
    this.cancelForm.emit()
  }

}
