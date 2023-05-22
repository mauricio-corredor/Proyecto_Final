import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoLoginGuard implements CanActivate {

  constructor(
    private tokenService:TokenService,
    private router:Router
  ){}

  canActivate(next: ActivatedRouteSnapshot,  state: RouterStateSnapshot): boolean {
    if(!this.tokenService.isLogged()){
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}
