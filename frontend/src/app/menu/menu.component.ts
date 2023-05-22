import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../shared/shared.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLogged: boolean = false;
  isCollapsed = true;
  title = 'Front';
  language: string = 'en';
  selectedCountry: string = '';
  countries: string[] = ['Ecuador', 'Perú', 'Colombia', 'Chile', 'Argentina'];
  country: string = '';

  @ViewChild('selectBox') selectBoxRef: ElementRef | undefined;

  constructor(
      public translate: TranslateService,
      public sharedService: SharedService,
      public tokenService:TokenService,
      public router:Router
    ) {
    }


  get selectOpen() {
    return (
      this.selectBoxRef &&
      this.selectBoxRef.nativeElement.classList.contains('select-hide')
    );
  }

  onSelectLanguage(event: any) {
    this.language = event.target.value;
    this.translate.use(this.language);
    localStorage.setItem('language', this.language);
  }

  onSelectCountry(event: any) {
    this.selectedCountry = event.target.value;
    this.sharedService.setSelectedCountry(this.selectedCountry);
    localStorage.setItem('selectedCountry', this.selectedCountry);
  }

  toggleSelect(): void {
    const select = this.selectBoxRef?.nativeElement;
    if (select) {
      select.classList.toggle('select-hide');
    }
  }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.language = "en";
    const storedCountry = localStorage.getItem('selectedCountry');
    if (storedCountry) {
      this.selectedCountry = storedCountry;
    }
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      this.language = storedLanguage;
    }
  }

  logOut(): void {
    this.tokenService.logOut();
    this.router.navigate(['login']);
  }
}
