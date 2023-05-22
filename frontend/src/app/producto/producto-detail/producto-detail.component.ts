import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
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
  selected: boolean = false;
  actbtn: string | null = null;
  productoId: string = '';
  public language: string = 'en';

  constructor(private productoService: ProductoService,
    public router: Router,
    public route: ActivatedRoute,
    public translate: TranslateService
  ) {
  }

  getProductoDetail() {
    this.productoService.getProductoById(this.productoId).subscribe(c => {
      this.productoDetail = c;
    });
  }

  hideDetails(): void {
    this.selected = false; // reset selected to false to hide product details
    this.actbtn = null; // reset actbtn to null to unselect the active button
  }

  refresh() {
    window.location.reload();
  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.productoService.getProductoById(p['id']).subscribe(a => {
        this.productoDetail = a
      });
    });

  }
}
