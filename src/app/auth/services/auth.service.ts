import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = environment.baseUrl
  private user:Auth | undefined

  constructor(private http:HttpClient) { }

  verificarAutenticacion():Observable<boolean>{

    if(!localStorage.getItem('token')) {
      return of(false)
    }else {
      return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
              .pipe(
                map(auth => {
                  console.log('auth',auth);
                  this.user = auth
                  return true
                })
              )
    }

  }

  get userData() {
    return {...this.user}
  }

  login() {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
            .pipe(
              tap(res => this.user = res),
              tap(res => localStorage.setItem('token',res.id)),
            )
  }

}
