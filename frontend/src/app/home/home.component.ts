import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/models/producto';
import { ProductoService } from '../producto/producto.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productos: Producto[] = [];
  newProductos: Producto[] = [];


  constructor(private productoService: ProductoService,
    public translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.productoService.getProductos().subscribe(productos => {
      productos.sort((a, b) => a.idProducto.localeCompare(b.idProducto));
      this.newProductos = this.productos.slice(0, 3)
   });
  }

}
