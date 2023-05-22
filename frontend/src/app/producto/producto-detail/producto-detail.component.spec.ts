import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ProductoDetailComponent } from './producto-detail.component';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { MenuComponent } from 'src/app/menu/menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ProductoDetailComponent', () => {
  let component: ProductoDetailComponent;
  let fixture: ComponentFixture<ProductoDetailComponent>;
  let authService: AuthService;
  let tokenService: TokenService;
  let toastrService: ToastrService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoDetailComponent, MenuComponent ],
      imports: [HttpClientModule, TranslateModule.forRoot(), FormsModule, RouterTestingModule, NgbCollapseModule, ToastrModule.forRoot(), ReactiveFormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' }),
          },
        },
        AuthService,
        TokenService,
        ToastrService,
        Router,
        TranslateService,
        {
          provide: NgControl,
          useValue: {
            control: {
              value: '',
              setValidators: () => {},
              updateValueAndValidity: () => {},
            },
          },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoDetailComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    tokenService = TestBed.inject(TokenService);
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
