import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Executive } from '../models/executive';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExecutiveService{

private apiUrl = environment.apiUrl + '/executive'

  constructor(private http:HttpClient) { }

    getExecutives(): Observable<Executive[]>{
      return this.http.get<Executive[]>(`${this.apiUrl}/`);
    }
  
    getExecutiveById(idExecutive:number):Observable<Executive>{
      return this.http.get<Executive>(`${this.apiUrl}/${idExecutive}`);
    }
  
    createExecutive(executive:Executive):Observable<Executive>{
      return this.http.post<Executive>(`${this.apiUrl}/create`,executive);
    }
  
    updateExecutive(idExecutive:number, executive:Executive):Observable<Executive>{
      return this.http.patch<Executive>(`${this.apiUrl}/update/${idExecutive}`,executive);
    }
  
    deleteExecutive(idExecutive:number):Observable<Executive>{
      return this.http.delete<Executive>(`${this.apiUrl}/delete/${idExecutive}`);
    }
}
