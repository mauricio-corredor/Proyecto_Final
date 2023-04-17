import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerformerDetail } from 'src/models/performerDetail';
import { MusicianService } from '../musician.service';
import { Prize } from 'src/models/prize';
import { Performer } from 'src/models/performer';


@Component({
  selector: 'app-performer-detail',
  templateUrl: './performer-detail.component.html',
  styleUrls: ['./performer-detail.component.scss']
})
export class PerformerDetailComponent implements OnInit {
  prizes: Prize[];
  performerDetail: PerformerDetail;

  @Input() performer: Performer;

  constructor(
    private musicianService: MusicianService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    }

    performerId: number;
  getPerformerPrizes(): void {
    this.musicianService.getPrizes().subscribe(prizes => {
      this.prizes = prizes;
    });
  }

  getMusicianDetail(): void {
   this.musicianService.getMusicianDetail(this.performer.id).subscribe(m => {
        this.performerDetail = m;
    });
  }

  getBandDetail(): void {
    this.musicianService.getBandDetail(this.performer.id).subscribe(b => {
    this.performerDetail = b;
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.performer.creationDate !== undefined) {
      this.getBandDetail();
    }
    else {
      this.getMusicianDetail();
    }
  }
  strToDate(publishingdate: string): Date {
    console.log(publishingdate);
    const dateNoTime: string[] = publishingdate.split('T');
    return new Date(dateNoTime[0]);
  }



}
