import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrizeModule } from './prize/prize.module';
import { MusicianModule } from './musician/musician.module';
import { AlbumModule } from './album/album.module';
import { ProductoModule } from './producto/producto.module';
import { CollectorModule } from './collector/collector.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MusicianModule,
    AlbumModule,
    ProductoModule,
    CollectorModule,
    NgbModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    PrizeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
