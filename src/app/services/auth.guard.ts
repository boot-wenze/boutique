import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecureStorageService } from './secure-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private securestorage : SecureStorageService,
    private router : Router
  ){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.securestorage.hasOwnProperty("OAuthBT")){
      return true;
    }else{
      this.router.navigate(['/'])
      return false;
    }
  }

}
