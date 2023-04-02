import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollectorCreateComponent } from './collector-create/collector-create.component';
import { CollectorListComponent } from './collector-list/collector-list.component';
import { CollectorDetailComponent } from './collector-detail/collector-detail.component';
import { CollectorAlbumAddComponent } from './collector-album-add/collector-album-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'collectors', component: CollectorListComponent },
      { path: 'collectors/:id', component: CollectorDetailComponent },
      { path: 'collector/create', component: CollectorCreateComponent },
      { path: 'collector/album/add', component: CollectorAlbumAddComponent }
    ])
  ],
  declarations: [
    CollectorListComponent,
    CollectorDetailComponent,
    CollectorCreateComponent,
    CollectorAlbumAddComponent
  ],
  exports: [
    CollectorListComponent,
    CollectorCreateComponent,
    CollectorAlbumAddComponent
  ]
})
export class CollectorModule { }
