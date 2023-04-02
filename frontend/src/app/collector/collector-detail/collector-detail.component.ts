import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectorAlbum } from 'src/models/collectorAlbum';
import { Collector } from '../../../models/collector';
import { CollectorService } from '../collector.service';

@Component({
  selector: 'app-collector-detail',
  templateUrl: './collector-detail.component.html',
  styleUrls: ['./collector-detail.component.css']
})
export class CollectorDetailComponent implements OnInit {

  @Input() collectorDetail: Collector;
  collectorAlbums: CollectorAlbum[];
  collectorId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collectorService: CollectorService
  ) { }

  getCollectorDetail() {
    this.collectorService.getCollector(this.collectorId).subscribe(c => {
      this.collectorDetail = c;
      this.getCollectorAlbums(c);
    });
  }

  getCollectorAlbums(collectorDetail: Collector) {
    this.collectorService.getCollectorAlbums(collectorDetail.id).subscribe(ca => {
      this.collectorAlbums = ca;
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
    if (this.collectorDetail === undefined) {
      this.collectorId = +this.route.snapshot.paramMap.get('id');
      this.getCollectorDetail();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getCollectorAlbums(this.collectorDetail);
  }
}
