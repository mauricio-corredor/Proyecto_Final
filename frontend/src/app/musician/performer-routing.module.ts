import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicianCreateComponent } from './musician-create/musician-create.component';
import { MusicianComponent } from './musician.component';
import { PerformerDetailComponent } from './performer-detail/performer-detail.component';


const routes: Routes = [{
  path: 'performers',
  children: [
    {
      path: 'list',
      component: MusicianComponent
    },
    {
      path: ':id',
      component: PerformerDetailComponent,
      runGuardsAndResolvers: 'always'
    }
  ]
},

{
  path: 'musician/create',
  component: MusicianCreateComponent,
  runGuardsAndResolvers: 'always'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformerRoutingModule { }
