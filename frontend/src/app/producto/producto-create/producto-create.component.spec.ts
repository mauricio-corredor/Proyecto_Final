import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ProductoCreateComponent } from './producto-create.component';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { MenuComponent } from 'src/app/menu/menu.component';

describe('ProductoCreateComponent', () => {
  let component: ProductoCreateComponent;
  let fixture: ComponentFixture<ProductoCreateComponent>;
  let authService: AuthService;
  let tokenService: TokenService;
  let toastrService: ToastrService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoCreateComponent, MenuComponent ],
      imports: [HttpClientModule, TranslateModule.forRoot(), FormsModule, NgbCollapseModule, ToastrModule.forRoot(), ReactiveFormsModule],
      providers: [
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

    fixture = TestBed.createComponent(ProductoCreateComponent);
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
