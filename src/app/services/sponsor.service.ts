import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Sponsor } from '../models/sponsor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  private apiUrl= environment.apiUrl + '/sponsor'
  constructor(private http:HttpClient) { }

    getSponsors(): Observable<Sponsor[]>{
      return this.http.get<Sponsor[]>(`${this.apiUrl}`);
    }
  
    getSponsorById(idSponsor:number):Observable<Sponsor>{
      return this.http.get<Sponsor>(`${this.apiUrl}/${idSponsor}`);
    }
  
    createSponsor(sponsor:Sponsor):Observable<Sponsor>{
      return this.http.post<Sponsor>(`${this.apiUrl}/create`,sponsor);
    }
  
  
    deleteSponsor(idSponsor:number):Observable<Sponsor>{
      return this.http.delete<Sponsor>(`${this.apiUrl}/delete/${idSponsor}`);
    }
}
