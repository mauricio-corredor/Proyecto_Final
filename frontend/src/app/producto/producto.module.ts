import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductoCreateComponent } from './producto-create/producto-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ProductoListComponent,
    ProductoCreateComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'productos', component: ProductoListComponent },

    ])
  ],
  exports: [
    ProductoListComponent

  ]
})
export class ProductoModule { }

