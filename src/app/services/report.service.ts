import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Report } from '../models/report';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = environment.apiUrl + '/reports'
  constructor(private http:HttpClient) { }

    getReports(): Observable<Report[]>{
      return this.http.get<Report[]>(`${this.apiUrl}/`);
    }
  
    getReportyById(idReport:number):Observable<Report>{
      return this.http.get<Report>(`${this.apiUrl}/${idReport}`);
    }
  
    createReport(report:Report):Observable<Report>{
      return this.http.post<Report>(`${this.apiUrl}/`,report);
    }
  
    updateReport(idReport:number, report:Report):Observable<Report>{
      return this.http.patch<Report>(`${this.apiUrl}/${idReport}`,report);
    }
  
    deleteReport(idReport:number):Observable<Report>{
      return this.http.delete<Report>(`${this.apiUrl}/${idReport}`);
    }
}
