import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { LoginUsuarioDto } from 'src/models/login-usuario.dto';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: LoginUsuarioDto | null = null;
  nombreUsuario: string;
  password: string;

  constructor(
    private sharedService: SharedService,
    private authService:AuthService,
    private tokenService:TokenService,
    private toastrService:ToastrService,
    private router:Router,
    public translate: TranslateService
  ){
    this.nombreUsuario = "";
    this.password = "";
    this.translate.setDefaultLang('en');
  }

    ngOnInit(): void {

    }

    onLogin(): void {
      this.usuario = new LoginUsuarioDto(this.nombreUsuario, this.password);
      this.authService.login(this.usuario).subscribe(
        data => {
          if(!data.token){
            this.toastrService.error(data.response.message, 'Fail', {
              timeOut: 3000, positionClass: 'toast-top-center'
            });
          }
          else{
            this.tokenService.setToken(data.token);
            this.router.navigate(['/']);
          }
        },
        err => {
          this.toastrService.error(err.error.message, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      );
    }
}
