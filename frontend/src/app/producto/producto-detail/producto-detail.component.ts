import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../producto.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css']
})
export class ProductoDetailComponent implements OnInit {

  @Input() productoDetail: Producto  = new Producto(
    "123",
    "Example Product",
    "https://example.com/product.jpg",
    "Example Supplier",
    "Example Manufacturer",
    "10 oz",
    "Example Type",
    "2024-01-01",
    "ABC123",
    9.99
  );

  productoId: string = '';

  constructor(private productoService: ProductoService,
    public router: Router,
    public route: ActivatedRoute,
    public translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
  }

  getProductoDetail() {
    this.productoService.getProductoById(this.productoId).subscribe(c => {
      this.productoDetail = c;
    });
  }


  strToCurrency(price: number) {
    let formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
      });

    return formatter.format(price);
  }

  ngOnInit() {
    if (this.productoDetail === undefined) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id !== null) {
        this.productoId = id;
        this.getProductoDetail();
      }
    }
  }


}
