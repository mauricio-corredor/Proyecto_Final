import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { LoginUsuarioDto } from 'src/models/login-usuario.dto';
import { NuevoUsuarioDto } from 'src/models/nuevo-usuario.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should send login request', () => {
    const dummyResponse = { token: 'dummyToken' };
    const dummyDto: LoginUsuarioDto = { nombreUsuario: 'user', password: 'password' };

    authService.login(dummyDto).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const request = httpTestingController.expectOne(environment.authUrl + 'login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(dummyDto);

    request.flush(dummyResponse);
  });

  it('should send registro request', () => {
    const dummyResponse = { message: 'Registro exitoso' };
    const dummyDto: NuevoUsuarioDto = { nombre: 'user', nombreUsuario: 'user', password: 'password' };

    authService.registro(dummyDto).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const request = httpTestingController.expectOne(environment.authUrl + 'nuevo');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(dummyDto);

    request.flush(dummyResponse);
  });
});
