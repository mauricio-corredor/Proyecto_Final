import { Component, OnInit } from '@angular/core';
import { Album } from 'src/models/album';
import { AlbumService } from '../album/album.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  albums: Album[];
  newAlbums: Album[];

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.albumService.getAlbums().subscribe(albums => {
      this.albums = albums.sort((a, b) => b.id - a.id);
      this.newAlbums = this.albums.slice(0, 3)
   });
  }

}
