import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Album } from '../../../models/album';
import { AlbumService } from '../album.service';
import { Genre } from '../../../models/genre.enum';
import { RecordLabel } from '../../../models/recordLabel.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit{
  imageWidth: number = 250;
  imageHeight: number = 230;
  scroll: boolean;
  fixedStyle: object = {"position": "fixed"};
  display: object = {"display": "none"};
  sub: Subscription;
  albums: Album[];
  artists: string[];
  genres: Genre[];
  labels: RecordLabel[];
  filteredAlbums: Album[] = [];
  filterValues: { [filter: string]: string } = {
    artist: "",
    genre: "",
    label: ""
  };
  openForm: boolean = false;

  private _artistFilter: string;
  get artistFilter(): string {
    return this._artistFilter;
  }
  set artistFilter(value: string) {
    this._artistFilter = value;
    this.filterValues.artist = value
    this.filteredAlbums = this.performFilters();
  }

  private _genreFilter: Genre;
  get genreFilter(): Genre {
    return this._genreFilter;
  }
  set genreFilter(value: Genre) {
    this._genreFilter = value;
    this.filterValues.genre = value
    this.filteredAlbums = this.performFilters();
  }

  private _labelFilter: RecordLabel;
  get labelFilter(): RecordLabel {
    return this._labelFilter;
  }
  set labelFilter(value: RecordLabel) {
    this._labelFilter = value;
    this.filterValues.label = value
    this.filteredAlbums = this.performFilters();
  }

  constructor(private albumService: AlbumService,
    private router: Router,
    private route: ActivatedRoute) { }

  performFilters(): Album[] {
    let albums: Album[] = []

    if (this.filterValues.artist === "" && this.filterValues.genre === "" && this.filterValues.label === "") {
      return albums = this.albums;
    }
    if (this.filterValues.artist !== "") {
      this.performArtistFilter().forEach(x=> albums.push(x));
    }
    if (this.filterValues.genre !== "") {
      this.performGenreFilter().forEach(x=> albums.push(x));
    }
    if (this.filterValues.label !== "") {
      this.performLabelFilter().forEach(x=> albums.push(x));
    }

    return [...new Set(albums)].sort((a, b) => (a.name < b.name ? -1 : 1));
  }

  performArtistFilter(): Album[] {
    let filter = this.albums.filter((album: Album) =>
    album.performers.map(p =>p.name).includes(this.filterValues.artist));
    return this.filterValues.artist === '' ? this.albums : filter;
  }

  performGenreFilter(): Album[] {
    return this.albums.filter((album: Album) =>
      album.genre.includes(this.filterValues.genre));
  }

  performLabelFilter(): Album[] {
    return this.albums.filter((album: Album) =>
      album.recordLabel.includes(this.filterValues.label));
  }

  onSelected(albumId: number): void {
    this.router.navigate(['/albums/' + albumId]);
  }

  showForm() {
    this.openForm = true;
  }

  hideForm() {
    this.openForm = false;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      if (p['genre'] || p['label'] || p['artist']) {
        setTimeout(() => {
          if (p['genre']) {
            this.genreFilter = p['genre']
          }
          if (p['label']) {
            this.labelFilter = p['label']
          }
          if (p['artist']) {
            this.artistFilter = p['artist']
          }
        }, 1000);
      }
    });
    this.sub = this.albumService.getAlbums().subscribe(albums => {
      this.albums = albums.sort((a, b) => (a.name < b.name ? -1 : 1));
      this.filteredAlbums = this.albums;
      this.artists = [...new Set(this.albums.map(a => a.performers).map(p => p.map(x=> x.name)).map(n=> n[0]))].sort();
   });
    this.genres = [
      Genre.Classical,
      Genre.Folk,
      Genre.Rock,
      Genre.Salsa
    ]
    this.labels = [
      RecordLabel.DiscosFuentes,
      RecordLabel.Elektra,
      RecordLabel.EMI,
      RecordLabel.FaniaRecords,
      RecordLabel.SonyMusic
    ]
  }

}
