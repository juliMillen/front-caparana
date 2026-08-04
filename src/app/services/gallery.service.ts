import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Gallery } from '../models/gallery';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private apiUrl= environment + '/gallery'
  constructor(private http:HttpClient) { }

  
    createGallery(gallery:Gallery):Observable<Gallery>{
      return this.http.post<Gallery>(`${this.apiUrl}/`,gallery);
    }
  
    updateCategority(idGallery:number, gallery:Gallery):Observable<Gallery>{
      return this.http.patch<Gallery>(`${this.apiUrl}/${idGallery}`,gallery);
    }

}
