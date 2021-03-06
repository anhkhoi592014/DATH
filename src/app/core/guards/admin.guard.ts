import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SystemConstants } from '../common/system.constants';
import { UrlConstants } from '../common/url.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(localStorage.getItem(SystemConstants.CURRENT_USER_ID)){
        if(localStorage.getItem(SystemConstants.CURRENT_USER_ROLE) == "2"){
          return true;
        }else{
          this.router.navigate([UrlConstants.HOME],{
            queryParams:{returnUrl:state.url}
          })
        }
      }else{
        this.router.navigate([UrlConstants.LOGIN],{
          queryParams:{returnUrl:state.url}
        })
      }
  }
}
