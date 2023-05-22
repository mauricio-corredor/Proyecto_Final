import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InventarioComponent } from './inventario/inventario.component';
import { BodegaCreateComponent } from './bodega/bodega-create/bodega-create.component';
import { BodegaListComponent } from './bodega/bodega-list/bodega-list.component';
import { ProductoListComponent } from './producto/producto-list/producto-list.component';
import { ProductoDetailComponent } from './producto/producto-detail/producto-detail.component';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { LoginGuard } from './guards/login.guard';
import { EstadoLoginGuard } from './guards/estadoLogin.guard';
import { BodegaRoomComponent } from './bodega/bodega-room/bodega-room.component';
import { BodegaProductoComponent } from './bodega/bodega-producto/bodega-producto.component';
import { OrdenListComponent } from './orden/orden-list/orden-list.component';
import { OrdenDetailComponent } from './orden/orden-detail/orden-detail.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'inventario', component: InventarioComponent, canActivate: [EstadoLoginGuard] },
  {path: 'inventario', component: BodegaCreateComponent, canActivate: [EstadoLoginGuard] },
  {path: 'bodegas', component: BodegaListComponent, canActivate: [EstadoLoginGuard] },
  {path: 'bodega/:id', component: BodegaRoomComponent, canActivate: [EstadoLoginGuard]  },
  {path: 'bodegaProd/:id', component: BodegaProductoComponent, canActivate: [EstadoLoginGuard]  },
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'registro', component: RegistroComponent, canActivate: [LoginGuard]},
  {path: 'productos', component: ProductoListComponent, canActivate: [EstadoLoginGuard] },
  {path: 'producto/:id', component: ProductoDetailComponent, canActivate: [EstadoLoginGuard]  },
  {path: 'ordenes', component: OrdenListComponent, canActivate: [EstadoLoginGuard] },
  {path: 'orden/:id', component: OrdenDetailComponent, canActivate: [EstadoLoginGuard]  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
   declarations: []
})
export class AppRoutingModule { }
