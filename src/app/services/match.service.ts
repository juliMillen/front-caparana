import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../models/match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private apiUrl = environment.apiUrl + '/match'
  constructor(private http:HttpClient) { }


  getMatches():Observable<Match[]>{
    return this.http.get<Match[]>(`${this.apiUrl}`)
  }

  getMatchById(idMatch:number):Observable<Match>{
    return this.http.get<Match>(`${this.apiUrl}/${idMatch}`);
  }

  createMatch(match:Match):Observable<Match>{
    return this.http.post<Match>(`${this.apiUrl}/create`,match);
  }

  updateMatch(idMatch:number, match:Match):Observable<Match>{
    return this.http.patch<Match>(`${this.apiUrl}/update/${idMatch}`,match);
  }

  deleteMatch(idMatch:number):Observable<Match>{
    return this.http.delete<Match>(`${this.apiUrl}/delete/${idMatch}`);
  }
}
