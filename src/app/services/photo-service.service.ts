import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Photo } from '../models/photo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoServiceService {

  private apiUrl =environment.apiUrl + '/photo'
  constructor(private http:HttpClient) { }

    getPhotos(): Observable<Photo[]>{
      return this.http.get<Photo[]>(`${this.apiUrl}/`);
    }
  
    getPhotoById(idPhoto:number):Observable<Photo>{
      return this.http.get<Photo>(`${this.apiUrl}/${idPhoto}`);
    }
  
    createPhoto(photo:Photo):Observable<Photo>{
      return this.http.post<Photo>(`${this.apiUrl}/`,photo);
    }
  
    deletePhoto(idPhoto:number):Observable<Photo>{
      return this.http.delete<Photo>(`${this.apiUrl}/${idPhoto}`);
    }
}
