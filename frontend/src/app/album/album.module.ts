import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumListComponent } from './album-list/album-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { RouterModule } from '@angular/router';
import { AlbumCreateComponent } from './album-create/album-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrackCreateComponent } from './track-create/track-create.component';


@NgModule({
  declarations: [
    AlbumListComponent,
    AlbumDetailComponent,
    AlbumCreateComponent,
    TrackCreateComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'albums', component: AlbumListComponent },
      { path: 'albums/:id', component: AlbumDetailComponent }
    ])
  ],
  exports: [
    AlbumListComponent,
    AlbumDetailComponent
  ]
})
export class AlbumModule { }
