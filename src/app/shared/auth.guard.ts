import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { take,map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authSvc: AuthService,private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authSvc.user$.pipe(
        take(1),
        map((user) =>{
          console.log('user->',user);
          if(user){
            return true;
          }
          else{
            //reddirectloginpage
            this.router.navigate(['/login'])
            return false;
          }
        })
      );
    }
  }

  

