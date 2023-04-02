import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Collector } from '../../../models/collector';
import { CollectorService } from '../collector.service';


@Component({
  selector: 'app-collector-list',
  templateUrl: './collector-list.component.html',
  styleUrls: ['./collector-list.component.css']
})
export class CollectorListComponent implements OnInit {

  constructor(private collectorService: CollectorService) { }

  collectors: Array<Collector>;
  selectedCollector: Collector;
  selected = false;

  getCollectorsList() {
    this.collectorService.getCollectors().subscribe(cl => {
      this.collectors = cl.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  onSelected(c: Collector) {
    this.selected = true;
    this.selectedCollector = c;
  }

  ngOnInit() {
    this.getCollectorsList();
  }

}
