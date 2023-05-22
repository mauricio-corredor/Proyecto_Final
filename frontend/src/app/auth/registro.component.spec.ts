import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegistroComponent } from './registro.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../shared/shared.service';
import { MenuComponent } from '../menu/menu.component';
import { FormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let authService: AuthService;
  let toastrService: ToastrService;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RegistroComponent, MenuComponent],
        imports: [TranslateModule.forRoot(), FormsModule, NgbCollapseModule],
        providers: [
          { provide: SharedService, useValue: {} },
          { provide: AuthService, useValue: {} },
          { provide: ToastrService, useValue: {} },
          { provide: Router, useValue: {} },
          { provide: TranslateService, useValue: {} }
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);

  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});

