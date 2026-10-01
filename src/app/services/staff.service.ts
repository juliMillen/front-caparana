import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from '../models/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private apiUrl= environment.apiUrl + '/staff'
  constructor(private http:HttpClient) { }


  getStaff():Observable<Staff[]>{
    return this.http.get<Staff[]>(`${this.apiUrl}`);
  }

  getStaffById(idStaff:number):Observable<Staff>{
    return this.http.get<Staff>(`${this.apiUrl}/${idStaff}`);
  }

  createStaff(idCategority:number,formData:FormData):Observable<Staff>{
    return this.http.post<Staff>(`${this.apiUrl}/create/${idCategority}`,formData);
  }

  updateStaff(idStaff:number,formData:FormData):Observable<Staff>{
    return this.http.patch<Staff>(`${this.apiUrl}/update/${idStaff}`,formData);
  }

  deleteStaff(idStaff:number):Observable<Staff>{
    return this.http.delete<Staff>(`${this.apiUrl}/delete/${idStaff}`);
  }
}
