import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrizeCreateComponent } from './prize-create/prize-create.component';
import { PrizeListComponent } from './prize-list/prize-list.component';


const routes: Routes = [{
  path: 'prizes',
  children: [
    {
      path: 'list',
      component: PrizeListComponent
    },

  ]
},

{
  path: 'prize/create',
  component: PrizeCreateComponent,
  runGuardsAndResolvers: 'always'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrizeRoutingModule { }


