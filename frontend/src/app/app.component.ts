import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from './shared/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = true;
  title = 'Front';
  translateService: any;
  public language: string = 'en';
  selectedCountry: string = 'EUR'; // define the selectedCountry property with a default value of 'USD'
  public countrySelected: string = 'EUR'; // Set a default value for the country selected
  public countries: string[] = ['EUR', 'USD', 'GBP']; // Add the list of countries that you want to allow the user to select from
  country: string ='EUR';

  constructor(private translate: TranslateService,
    private sharedService: SharedService) {
    }

  switchLanguage() {
    if (this.translate.currentLang === 'en') {
      this.translate.use('es');
    } else {
      this.translate.use('en');
    }
  }

  get selectOpen() {
    // define a getter function to determine whether the select dropdown is open
    // based on whether the select-hide class is present on the select element
    const select = document.getElementById('language');
    return select && select.classList.contains('select-hide');
  }

  onSelectLanguage(event: any) {
    // set the selected language and update the active language
    this.language = event.target.value;
    this.translate.use(this.language);
  }


  changeLanguage(language: string) {
    // set the selected language
    this.translateService.use(language);
    // store the selected language in local storage
    localStorage.setItem('language', language);
  }


  onSelectCountry(event: any) {

    this.selectedCountry = event.target.value;
    this.sharedService.setSelectedCountry(this.selectedCountry);

  }

}



// src/app/app.component.ts
