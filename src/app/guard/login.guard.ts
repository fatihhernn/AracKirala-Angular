import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  //kullanıcı logiin olmamışsa onu login ekranına yönlendireceğiz
  //guard : bir işlemi yapsın mı yapamasın mı

  //bu kişi auth mu
  constructor(private authService:AuthService,private toastrService:ToastrService,private router:Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;

    if (this.authService.isAuthenticated()){
      return true;
    }
    else {
      this.router.navigate(["login"])
      this.toastrService.info("Sisteme giriş yapmalısınız")
      return false;
    }
  }

}
