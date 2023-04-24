import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductoCreateComponent } from './producto-create/producto-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: 'productos', component: ProductoListComponent },
  { path: 'producto/:id', component: ProductoDetailComponent }
];

@NgModule({
  declarations: [
    ProductoListComponent,
    ProductoDetailComponent,
    ProductoCreateComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProductoListComponent,
    ProductoDetailComponent
  ]
})
export class ProductoModule { }
