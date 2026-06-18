import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Discipline } from '../models/discipline';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisciplineServiceService {

  private apiUrl = environment.apiUrl + '/discipline'
  constructor(private http:HttpClient) { }

    getDisciplines(): Observable<Discipline[]>{
      return this.http.get<Discipline[]>(`${this.apiUrl}/`);
    }
  
    getDisciplineById(idDiscipline:number):Observable<Discipline>{
      return this.http.get<Discipline>(`${this.apiUrl}/${idDiscipline}`);
    }
  
    createDiscipline(discipline:Discipline):Observable<Discipline>{
      return this.http.post<Discipline>(`${this.apiUrl}/`,discipline);
    }
  
    updateDiscipline(idDiscipline:number, discipline:Discipline):Observable<Discipline>{
      return this.http.patch<Discipline>(`${this.apiUrl}/${idDiscipline}`,discipline);
    }
  
    deleteDiscipline(idDiscipline:number):Observable<Discipline>{
      return this.http.delete<Discipline>(`${this.apiUrl}/${idDiscipline}`);
    }
}
