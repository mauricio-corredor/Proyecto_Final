import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { Orden } from '../../../models/orden';
import { OrdenService } from '../orden.service';
import { TranslateService } from '@ngx-translate/core';
import { ResumenOrden } from 'src/models/resumenOrden';
import { VendedorDetalle } from 'src/models/vendedor';
import { ProductoOrden } from 'src/models/productoOrden';
import { EstadoOrden } from 'src/models/estadoOrden';


@Component({
  selector: 'app-orden-detail',
  templateUrl: './orden-detail.component.html',
  styleUrls: ['./orden-detail.component.css']
})
export class OrdenDetailComponent implements OnInit {

  @Input() ordenDetail!: Orden;


  selected: boolean = false;
  actbtn: string | null = null;
  ordenNumber: string = '';
  public language: string = 'en';
  productosOrden : ProductoOrden[] = [];
  vendedor!: VendedorDetalle;
  resumenOrden!: ResumenOrden;
  estadoOrden : EstadoOrden = EstadoOrden.Cancelada;
  paisOrdenes: string = '';
  ordenId: string = '';
  country: string ='';

  constructor(private ordenService: OrdenService,
    private sharedService: SharedService,
    public router: Router,
    public route: ActivatedRoute,
    public translate: TranslateService
  ) {

  }

  // getOrdenDetail() {
  //   this.ordenService.getOrdenById(this.ordenNumber).subscribe(c => {
  //     this.ordenDetail = c;
  //   });
  // }


  hideDetails(): void {
    this.selected = false; // reset selected to false to hide product details
    this.actbtn = null; // reset actbtn to null to unselect the active button
  }

  refresh() {
    window.location.reload();
  }

  ngOnInit(): void {


    this.sharedService.selectedCountry$.subscribe(country => {
      this.country = country;
    });

    this.route.params.subscribe(p => {
      this.ordenService.getOrdenById(p['id']).subscribe(a => {
        this.ordenDetail = a;
        this.productosOrden = this.ordenDetail.productosOrden;
        this.vendedor = this.ordenDetail.vendedorDetalle;
        this.resumenOrden = this.ordenDetail.resumenOrden;

      });

    });





  }


}
