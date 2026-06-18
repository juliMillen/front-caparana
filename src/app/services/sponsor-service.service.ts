import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Sponsor } from '../models/sponsor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SponsorServiceService {

  private apiUrl= environment + '/sponsor'
  constructor(private http:HttpClient) { }

    getSponsors(): Observable<Sponsor[]>{
      return this.http.get<Sponsor[]>(`${this.apiUrl}/`);
    }
  
    getSponsorById(idSponsor:number):Observable<Sponsor>{
      return this.http.get<Sponsor>(`${this.apiUrl}/${idSponsor}`);
    }
  
    createSponsor(sponsor:Sponsor):Observable<Sponsor>{
      return this.http.post<Sponsor>(`${this.apiUrl}/`,Sponsor);
    }
  
    updateSponsor(idSponsor:number, sponsor:Sponsor):Observable<Sponsor>{
      return this.http.patch<Sponsor>(`${this.apiUrl}/${idSponsor}`,sponsor);
    }
  
    deleteSponsor(idSponsor:number):Observable<Sponsor>{
      return this.http.delete<Sponsor>(`${this.apiUrl}/${idSponsor}`);
    }
}
