import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _selectedCountry = new BehaviorSubject<string>('EUR');

  public get selectedCountry$() {
    return this._selectedCountry.asObservable();
  }

  public setSelectedCountry(country: string) {
    this._selectedCountry.next(country);
  }
}
