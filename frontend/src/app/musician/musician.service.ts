import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerformerDetail } from '../../models/performerDetail'
import { Performer } from '../../models/performer';
import { environment} from '../../environments/environment';
import { Prize } from 'src/models/prize';


@Injectable({
  providedIn: 'root'
})

export class MusicianService {

  private musicians = environment.baseUrl + 'musicians';
  private bands = environment.baseUrl + 'bands';
  private prizes = environment.baseUrl + 'prizes';

  constructor(private http: HttpClient) { }

  getMusicians(): Observable<Performer[]> {
    return this.http.get<Array<Performer>>(this.musicians);

  }

  getBands(): Observable<Performer[]> {
    return this.http.get<Array<Performer>>(this.bands);
  }

  getMusicianDetail(id: number) : Observable<PerformerDetail> {
    return this.http.get<PerformerDetail>(this.musicians + "/" + id);
  }

  getBandDetail(id: number) : Observable<PerformerDetail> {
    return this.http.get<PerformerDetail>(this.bands + "/" + id);
  }

  getPrizes(): Observable<Prize[]> {
    return this.http.get<Array<Prize>>(this.prizes);
  }

  addMusician(newMusician: PerformerDetail): Observable<PerformerDetail> {
    return this.http.post<PerformerDetail>(this.musicians, newMusician);
  }


}
