import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Categority } from '../models/categority';

@Injectable({
  providedIn: 'root'
})
export class CategorityService {

  private apiUrl= environment.apiUrl + '/categority'

  constructor(private http:HttpClient) { }

  getCategorities(): Observable<Categority[]>{
    return this.http.get<Categority[]>(`${this.apiUrl}`);
  }

  getCategorityById(idCategority:number):Observable<Categority>{
    return this.http.get<Categority>(`${this.apiUrl}/${idCategority}`);
  }

  createCategority(categority:Categority):Observable<Categority>{
    return this.http.post<Categority>(`${this.apiUrl}/`,categority);
  }

  updateCategority(idCategority:number, categority:Categority):Observable<Categority>{
    return this.http.patch<Categority>(`${this.apiUrl}/${idCategority}`,categority);
  }

  deleteCategority(idCategority:number):Observable<Categority>{
    return this.http.delete<Categority>(`${this.apiUrl}/${idCategority}`);
  }
}
