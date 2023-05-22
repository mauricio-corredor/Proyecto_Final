import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedService } from '../shared/shared.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let translateService: TranslateService;
  let sharedService: SharedService;
  let tokenService: TokenService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      imports: [TranslateModule.forRoot(), NgbModule],
      providers: [TranslateService, SharedService, TokenService, Router]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    sharedService = TestBed.inject(SharedService);
    tokenService = TestBed.inject(TokenService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set language when onSelectLanguage is called', () => {
    const language = 'en';
    spyOn(component.translate, 'use');
    spyOn(localStorage, 'setItem');

    component.onSelectLanguage({ target: { value: language } });

    expect(component.language).toEqual(language);
    expect(component.translate.use).toHaveBeenCalledWith(language);
    expect(localStorage.setItem).toHaveBeenCalledWith('language', language);
  });

  it('should set selected country when onSelectCountry is called', () => {
    const country = 'USA';
    spyOn(component.sharedService, 'setSelectedCountry');
    spyOn(localStorage, 'setItem');

    component.onSelectCountry({ target: { value: country } });

    expect(component.selectedCountry).toEqual(country);
    expect(component.sharedService.setSelectedCountry).toHaveBeenCalledWith(country);
    expect(localStorage.setItem).toHaveBeenCalledWith('selectedCountry', country);
  });

  it('should check if user is logged in', () => {
    spyOn(component.tokenService, 'isLogged').and.returnValue(true);

    component.ngOnInit();

    expect(component.isLogged).toBeTruthy();
  });

  it('should log out user', () => {
    spyOn(component.tokenService, 'logOut');
    spyOn(component.router, 'navigate');

    component.logOut();

    expect(component.tokenService.logOut).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(['login']);
  });


});
