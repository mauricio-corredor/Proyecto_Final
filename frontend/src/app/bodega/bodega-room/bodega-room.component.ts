import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bodega } from '../../../models/bodega';
import { BodegaService } from '../bodega.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TipoProducto } from 'src/models/tipoProducto1.enum';



@Component({
  selector: 'app-bodega-room',
  templateUrl: './bodega-room.component.html',
  styleUrls: ['./bodega-room.component.css']
})
export class BodegaRoomComponent implements OnInit {

  @Input() bodegaRoom: Bodega  = new Bodega(
    "123",
    "Example Product",
    "https://example.com/product.jpg",
    "Example Supplier",
    "Example Manufacturer",
    20,
    15,
    9.99
  );

  bodegaRoomDrawing = {
    filas: 5,
    columnas: 9,
    capacidadVolumen: 1000,
    CapacidadDisponible: 500,
    capacidadUsada: 500
  };
  Array = Array;
  columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  rows = ['1', '2', '3', '4', '5'];
  bodegas: Bodega[] = [];
  totalRoom: number =0;

  //cells: Array<{ row: number, col: number, color: string, occupied: boolean }> = [];
  cells: Array<{ col: number, color: string, occupied: boolean }> = [];
  selected: boolean = false;
  actbtn: string | null = null;
  bodegaId: string = '';
  public language: string = 'en';
  //bodegaRoomCells: { row: number, col: number }[] = [];
  sub: Subscription = new Subscription;


  constructor(private bodegaService: BodegaService,
    public router: Router,
    public route: ActivatedRoute,
    public translate: TranslateService
  ){


  }

    getBodegaRoom() {
      this.bodegaService.getBodegaById(this.bodegaId).subscribe(c => {
        this.bodegaRoom = c;
      });
    }

    hideDetails(): void {
      this.selected = false; // reset selected to false to hide product details
      this.actbtn = null; // reset actbtn to null to unselect the active button
    }

    refresh() {
      window.location.reload();
    }


    getRandomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }



    isOccupied(row: number, col: number): boolean {
      const cellNumber = (row - 1) * this.bodegaRoomDrawing.columnas + col;
      console.log(cellNumber);
      return cellNumber <= this.bodegaRoom.capacidadUsada;

    }

    sumOfRoom() {
      let totalRoom = 0;
      for (const bodega of this.bodegas) {
        if (!isNaN(bodega.CapacidadDisponible)) {
          totalRoom += Number(bodega.CapacidadDisponible);
        }
      }
      this.totalRoom = totalRoom;
    }

    fillCells() {
      const totalCells = this.bodegaRoomDrawing.filas * this.bodegaRoomDrawing.columnas;
      let areOccupied =0;
      const color = 'white';
      const occupancyRate = this.bodegaRoom.capacidadVolumen > 0 ?
       (this.bodegaRoom.capacidadUsada / this.bodegaRoom.capacidadVolumen) : 0;

      let occupiedCells = Math.round(totalCells * occupancyRate);
      console.log('celdas ocupadas', occupiedCells)

      const cells = [];
      for (let i = 0; i < totalCells; i++) {
        cells.push({
          //row: i,
          col: i,
          color: color,
          occupied: false
        });
      }

      for (let i = 0; i < occupiedCells; i++) {
        const randomCol = Math.floor(Math.random() * totalCells);
        if (!cells[randomCol].occupied){
          cells[randomCol].color = '#1E96FC';
          cells[randomCol].occupied = true;
          areOccupied++;
        } else {
          i--;
        }

      }

      this.cells = cells;
    }


    ngOnInit(): void {

      this.route.params.subscribe(p => {
        this.bodegaService.getBodegaById(p['id']).subscribe(a => {
          this.bodegaRoom = a
          this.fillCells();
        });

        this.sub = this.bodegaService.getBodegas().subscribe(bodegas => {
          this.bodegas = bodegas.sort((a, b) => a.idBodega.localeCompare(b.idBodega));
          this.sumOfRoom();
        });
      })

    }

}
