import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../environments/environment';
import { Prize } from 'src/models/prize';


@Injectable({
  providedIn: 'root'
})

export class PrizeService {

  private prizesURL = environment.baseUrl + 'prizes';

  constructor(private http: HttpClient) { }

  getPrizes(): Observable<Prize[]> {
    return this.http.get<Array<Prize>>(this.prizesURL);

  }
  addPrize(newPrize: Prize): Observable<Prize> {
    return this.http.post<Prize>(this.prizesURL, newPrize);
  }


}
