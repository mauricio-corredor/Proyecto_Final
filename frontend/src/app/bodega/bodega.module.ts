import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodegaListComponent } from './bodega-list/bodega-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BodegaCreateComponent } from './bodega-create/bodega-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


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
    RouterModule.forChild([
      { path: 'bodegas', component: BodegaListComponent },

    ])
  ],
  exports: [
    BodegaListComponent

  ]
})
export class BodegaModule { }

