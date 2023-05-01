import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodegaListComponent } from './bodega-list/bodega-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BodegaCreateComponent } from './bodega-create/bodega-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'bodegas', component: BodegaListComponent }
];

@NgModule({
  declarations: [
    BodegaListComponent,
    BodegaCreateComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    BodegaListComponent
  ]
})
export class BodegaModule { }
