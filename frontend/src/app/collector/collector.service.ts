import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Collector } from '../../models/collector';
import { environment } from 'src/environments/environment';
import { CollectorAlbum } from 'src/models/collectorAlbum';
import { Album } from 'src/models/album';

@Injectable({
  providedIn: 'root'
})
export class CollectorService {
  private apiUrl = environment.baseUrl + 'collectors/';

  constructor(private http: HttpClient) { }

  getCollectors(): Observable<Collector[]> {
    return this.http.get<Collector[]>(this.apiUrl);
  }

  getCollector(id: number): Observable<Collector> {
    return this.http.get<Collector>(this.apiUrl + id);
  }

  getCollectorAlbums(id: number): Observable<CollectorAlbum[]> {
    return this.http.get<CollectorAlbum[]>(this.apiUrl + id + '/albums');
  }

  createCollector(newCollector: Collector): Observable<Collector> {
    return this.http.post<Collector>(this.apiUrl, newCollector);
  }

  createCollectorAlbum(data: object): Observable<CollectorAlbum> {
    return this.http.post<CollectorAlbum>(
      this.apiUrl + data['collector'] + '/albums/' + data['album'],
      {"price": data['price'], "status": data['status']}
    );
  }
}
