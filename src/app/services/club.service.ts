import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Club } from '../models/club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private apiUrl = environment.apiUrl + '/club'

  constructor(private http:HttpClient) { }

  getClubById(id:number):Observable<Club>{
    return this.http.get<Club>(`${this.apiUrl}/${id}`);
  }

  createClub(club:Club):Observable<Club>{
    return this.http.post<Club>(`${this.apiUrl}`,club);
  }

  updateClub(id:number,club:Club):Observable<Club>{
    return this.http.patch<Club>(`${this.apiUrl}/${id}`,club);
  }
}
