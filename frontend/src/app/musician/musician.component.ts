import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MusicianService } from "./musician.service";
import { Performer } from 'src/models/performer';
import { PerformerPrize } from 'src/models/performerPrize';



@Component({
  selector: 'app-musician',
  templateUrl: './musician.component.html',
  styleUrls: ['./musician.component.css']
})
export class MusicianComponent implements OnInit {
  constructor( private musicianService: MusicianService) { }


  bandsList: Array<Performer>;
  musicianList: Array<Performer>;
  performers: Array<Performer>;
  performerPrizes: Array<PerformerPrize>

  selectedPerformer: Performer;
  selected = false;

 getMusicianList(): void {
    this.musicianService.getMusicians().subscribe(musicians => {
      this.musicianList = musicians;
    });
  }

  getBandsList(): void {
    this.musicianService.getBands().subscribe(bands => {
      this.bandsList = bands;
        this.musicianList.forEach(x=> this.bandsList?.push(x));
        this.performers = this.bandsList;
        this.performers.sort((a,b) => a.name < b.name ? -1 : 1);
    });
  }

  onSelected(b: Performer): void {
    this.selected = true;
    this.selectedPerformer = b;
  }

  ngOnInit() {
    this.getMusicianList();
    this.getBandsList();
  }


}
