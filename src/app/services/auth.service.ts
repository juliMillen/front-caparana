import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth/login'

  constructor(private httpClient:HttpClient) { }

  login(user:User):Observable<any>{
    return this.httpClient.post<any>(this.apiUrl,user);
  }

  guardarToken(token:string){
    localStorage.setItem('token',token);
  }

  obtenerToken():string | null{
    return localStorage.getItem('token');
  }

  usuarioLoggeado():boolean{
    return !!this.obtenerToken();
  }

  logout(){
    localStorage.removeItem('token');
  }

  obtenerRolDesdeToken():string | null{
    const token = this.obtenerToken();
    if(!token) return null;
    try{
      const payload = JSON.parse(atob(token.split('.')[1]));
      const authorities = payload.authorities;

      if(Array.isArray(authorities) && authorities.length > 0){
        return authorities[0];
      }
      return null;
    }catch(e){
      return null;
    }
  }
}
