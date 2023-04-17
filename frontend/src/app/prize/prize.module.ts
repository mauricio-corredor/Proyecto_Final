import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrizeListComponent } from './prize-list/prize-list.component';
import { Prize } from '../../models/prize';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrizeRoutingModule } from '../prize/prize-routing.module';
import { PrizeCreateComponent } from './prize-create/prize-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrizeRoutingModule,
  ],
  declarations: [
    PrizeListComponent,
    PrizeCreateComponent
  ],
  exports:[
    PrizeListComponent
  ]
})
export class PrizeModule { }
