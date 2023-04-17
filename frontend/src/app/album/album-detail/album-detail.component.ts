import { Component, OnInit} from '@angular/core';
import { CollectorService } from 'src/app/collector/collector.service';
import { Album } from 'src/models/album';
import { Collector } from 'src/models/collector';
import { AlbumService } from '../album.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {
  album: Album;
  userName: { [commentId: number]: string } = {};
  ratingsAverage: number;
  users: Collector[];
  collectorsName: string[];
  collectorAlbums: {[name: string]: number} = {};
  selected: boolean;
  openForm: boolean = false;

  constructor(private albumsService: AlbumService,
    private route: ActivatedRoute,
    private collectorService: CollectorService) { }

  returnNumberOfStars(i: number): number[] {
    return Array(i);
  }

  calculateRatingsAverage(ratings: number[]): void {
    this.ratingsAverage = ratings.length !== 0 ? ratings.reduce((a, b) => a + b) / ratings.length : 0;
  }

  getUsersNameForComments(): void{
    this.collectorService.getCollectors().subscribe(collectors => {
      this.users = collectors;
      setTimeout(() => {
        let commentsIds = this.album.comments.map(x=> x.id);
        let collectorsWhoCommentedAlbum = collectors.filter(x=> x.comments.find(y=> commentsIds.includes(y.id)));
        collectorsWhoCommentedAlbum.forEach(x=> x.comments.forEach(y=> this.userName[y.id] = x.name));
      }, 2000);
   });
  }

  getAlbumCollectors(): void {
    this.collectorAlbums = {};
    this.collectorsName = [];
    setTimeout(() => {
      this.users.forEach(x => this.collectorService.getCollectorAlbums(x.id).subscribe(c => {
          let album = c.find(y=> y.album.id === this.album.id && y.status === "Active");
          if (album) {
            this.collectorAlbums[x.name] = album.price;
            for (const key in this.collectorAlbums) {
              if (!this.collectorsName.includes(key)) {
                this.collectorsName.push(key)
              }
           }
          }
      }))
    }, 2000);
  }

  openCollectorsModal() {
    this.selected = !this.selected;
  }

  showTrackForm() {
    this.openForm = !this.openForm;
  }

  reloadTracks() {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.albumsService.getAlbumById(p['id']).subscribe(a => {
        this.album = a
      });
    });
    this.getUsersNameForComments();
    setTimeout(() => {
      this.calculateRatingsAverage(this.album.comments.map(x=> x.rating));
    }, 2000);
    this.getAlbumCollectors();
  }

}
