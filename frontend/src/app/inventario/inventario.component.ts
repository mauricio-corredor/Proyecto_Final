import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Inventario } from '../../models/inventario';
import { InventarioService } from './inventario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../shared/shared.service';
import { Observable } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { Paises } from './../../models/paises.enum';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit{
  country: string ='';
  imageWidth: number = 250;
  imageHeight: number = 230;
  scroll: boolean = false;
  fixedStyle: object = {"position": "fixed"};
  display: object = {"display": "none"};
  sub: Subscription = new Subscription;
  inventarios: Inventario[] = [];
  paises = Object.values(Paises);
  filteredInventarios: Inventario[] = [];
  filterValues: { [filter: string]: string } = {
    pais: ""
  };
  //selectedCurrency: string = 'USD';
  exchangeRate$!: Observable<number>;


  openForm: boolean = false;
  actbtn: string | null = null;
  selected: boolean = false;
  selectedInventario: Inventario  = new Inventario(
    "123",
    "123",
    "Colombia",
    20
  );


  private _paisFilter: Paises  = Paises.Colombia;
  get paisFilter(): Paises {
    return this._paisFilter;
  }
  set paisFilter(value: Paises) {
    this._paisFilter = value;
    this.filterValues['pais'] = value
    this.filteredInventarios = this.performFilters();
  }


  constructor(private sharedService: SharedService,
    private inventarioService: InventarioService,
    public router: Router,
    public route: ActivatedRoute,
    public translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');

  }


  performFilters(): Inventario[] {
    let inventarios: Inventario[] = []

    if (this.filterValues['pais'] !== "") {
      this.performPaisFilter().forEach(x=> inventarios.push(x));
    }

    return [...new Set(inventarios)].sort((a, b) => (a.id < b.id ? -1 : 1));
  }

  performPaisFilter(): Inventario[] {
    return this.inventarios.filter((inventario: Inventario) =>
      inventario.paisInventario.includes(this.filterValues['pais']));
  }

  onSelected(c: Inventario) {
    this.selected = true;
    this.selectedInventario = c;
  }
  hideDetails(): void {
    this.selected = false; // reset selected to false to hide product details
    this.actbtn = null; // reset actbtn to null to unselect the active button
  }

  showForm() {
    this.openForm = true;
  }


  hideForm() {
    this.openForm = false;
  }


  refresh() {
    window.location.reload();
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      if (p['pais'] || p['nombre'] || p['ciudad'] || p['zona']) {
        setTimeout(() => {

          if (p['pais']) {
            this.paisFilter = p['pais']
          }

        }, 1000);
      }
    });
    this.sub = this.inventarioService.getInventarios().subscribe(inventarios => {
      this.inventarios = inventarios.sort((a, b) => a.id.localeCompare(b.id));
      this.filteredInventarios = this.inventarios;
   });

  }

}
