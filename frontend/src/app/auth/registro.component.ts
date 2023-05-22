import { Component, OnInit } from '@angular/core';
import { NuevoUsuarioDto } from 'src/models/nuevo-usuario.dto';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{

  usuario: NuevoUsuarioDto | null = null;
  nombreUsuario: string;
  password: string;
  nombre: string;

  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    public translate: TranslateService
  ){
    this.nombre = "";
    this.nombreUsuario = "";
    this.password = "";

  }

  ngOnInit(): void {this.translate.setDefaultLang('en'); }

  onRegister(): void {
    this.usuario = new NuevoUsuarioDto(this.nombre, this.nombreUsuario, this.password);
    this.authService.registro(this.usuario).subscribe(
      data => {
          this.toastrService.success(data.message, 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['/login']);
      },
      err => {
        this.toastrService.error(err.error.message, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

}
