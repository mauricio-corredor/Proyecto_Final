import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MusicianComponent } from './musician.component';
import { MusicianCreateComponent } from './musician-create/musician-create.component';
import { PerformerRoutingModule } from './performer-routing.module';
import { PerformerDetailComponent } from './performer-detail/performer-detail.component';
import {PerformerDetail} from '../../models/performerDetail';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PerformerRoutingModule,
    NgbModule
  ],
  declarations: [
    MusicianComponent,
    MusicianCreateComponent,
    PerformerDetailComponent
  ],
  exports:[
    MusicianComponent,
    PerformerDetailComponent
  ],
})
export class MusicianModule { }
