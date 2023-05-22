import { NgModule, LOCALE_ID, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import { TranslateService, TranslateModule, TranslateLoader  } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedService } from './shared/shared.service';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { MenuComponent } from './menu/menu.component';
import { InventarioComponent } from './inventario/inventario.component';
import { BodegaCreateComponent } from './bodega/bodega-create/bodega-create.component';
import { BodegaListComponent } from './bodega/bodega-list/bodega-list.component';
import { BodegaRoomComponent } from './bodega/bodega-room/bodega-room.component';
import { ProductoListComponent } from './producto/producto-list/producto-list.component';
import { ProductoDetailComponent } from './producto/producto-detail/producto-detail.component';
import { ProductoCreateComponent } from './producto/producto-create/producto-create.component';
import { CurrencyPipe } from './shared/currency.pipe';
import { BodegaProductoComponent } from './bodega/bodega-producto/bodega-producto.component';
import { SharedModule } from './shared/shared.module';
import { OrdenListComponent } from './orden/orden-list/orden-list.component';
import { OrdenDetailComponent } from './orden/orden-detail/orden-detail.component';




export function setupTranslateServiceFactory(
  service: TranslateService): Function {
return () => service.use('en');
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localeEn);
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    InventarioComponent,
    BodegaCreateComponent,
    BodegaProductoComponent,
    BodegaListComponent,
    ProductoListComponent,
    ProductoDetailComponent,
    ProductoCreateComponent,
    BodegaRoomComponent,
    OrdenListComponent,
    OrdenDetailComponent
   ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [TranslateModule],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, './assets/i18n/', '.json');
        },
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [
    CurrencyPipe,
    TranslateService,
    SharedService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateServiceFactory,
      deps: [
        TranslateService
      ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}

// src/app/app.module.ts
