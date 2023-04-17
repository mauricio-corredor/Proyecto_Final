import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PrizeService } from "../prize.service";
import { Performer } from 'src/models/performer';
import { PerformerPrize } from 'src/models/performerPrize';
import { Prize } from 'src/models/prize';

@Component({
  selector: 'app-prize-list',
  templateUrl: './prize-list.component.html',
  styleUrls: ['./prize-list.component.css']
})

export class PrizeListComponent implements OnInit {
  constructor( private prizeService: PrizeService) { }

  selected = false;
  prizeList: Array<Prize>;

  getPrizeList(): void {
    this.prizeService.getPrizes().subscribe(prizes => {
      this.prizeList = prizes;
    });
  }

  ngOnInit() {
    this.getPrizeList();

  }
}
