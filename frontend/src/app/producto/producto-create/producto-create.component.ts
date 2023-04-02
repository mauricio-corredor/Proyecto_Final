import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { Producto } from 'src/models/producto';
import { ProductoService } from '../producto.service';
import { TipoProducto } from 'src/models/tipoProducto1.enum';


@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent implements OnInit {
  productoForm: FormGroup;
  url: string;
  tipos: TipoProducto[];
  productos: Producto[];


  @Input() openForm: boolean;
  @Output() cancelForm = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private productoService: ProductoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productoForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      telephone: ["", [Validators.required, Validators.minLength(7), Validators.pattern(/^[0-9]\d*$/)]],
      email: ["", [Validators.required, Validators.email]]
    });
  }


  createProducto(newProducto: Producto) {
    this.productoService.addProducto(newProducto).subscribe(producto => {
      this.showSuccess(newProducto);
    });
    this.productoForm.reset();
  }

  showSuccess(c: Producto) {
    this.toastr.success($localize`Producto created successfully!`);
  }

  cancelCreation() {
    this.productoForm.reset();
    this.router.navigate(['/productos'])
  }


  hideForm() {
    this.cancelForm.emit()
  }


}
