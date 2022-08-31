import { Injectable, Pipe } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

  constructor(
    private authService:AuthService,
    private router:Router
  ){}

  get user(){
    return this.authService.userData
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>| boolean {
    
      return this.authService.verificarAutenticacion()
              .pipe(
                tap(estaAutenticado => {
                  if(!estaAutenticado){
                    this.router.navigate(['./auth/login'])
                  }
                })
              )
    
      /*
      if (this.user.id){
        return true
      }else {
        return false
      }
    */
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean  {

      return this.authService.verificarAutenticacion()
               .pipe(
                 tap(estaAutenticado => {
                   if(!estaAutenticado){
                     this.router.navigate(['./auth/login'])
                   }
                 })
               )

      /*
      if (this.user.id){
        return true
      }else {
        return false
      }
      */
  }
}
