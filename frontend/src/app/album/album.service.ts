import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../../models/album';
import { environment } from '../../environments/environment';
import { Performer } from 'src/models/performer';
import { Track } from 'src/models/track';


@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private baseUrl = environment.baseUrl + 'albums/';
  constructor(private http: HttpClient) { }

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.baseUrl);
  }

  getAlbumById(id: number): Observable<Album> {
    return this.http.get<Album>(this.baseUrl + id);
  }

  addAlbum(album: Album): Observable<Album> {
    delete album.performers;
    return this.http.post<Album>(this.baseUrl, album);
  }

  addArtistToAlbum(album: Album, performer: Performer): Observable<Album> {
    if (performer.creationDate) {
      return this.http.post<Album>(this.baseUrl + album.id + "/bands/" + performer.id, undefined)
    }
    if (performer.birthDate) {
      return this.http.post<Album>(this.baseUrl + album.id + "/musicians/" + performer.id, undefined)
    }
  }

  addTrack(track: Track, albumId: number): Observable<Track> {
    return this.http.post<Track>(this.baseUrl + albumId + "/tracks", track)
  }
}
