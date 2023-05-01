import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioComponent } from './inventario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { CurrencyPipe } from 'src/app/shared/currency.pipe';

const routes: Routes = [
  { path: 'inventario', component: InventarioComponent },
];

@NgModule({
  declarations: [
    InventarioComponent
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
    InventarioComponent,

  ],
  providers: [CurrencyPipe],
})
export class InventarioModule { }
