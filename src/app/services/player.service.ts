import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Player } from '../models/player';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private apiUrl= environment.apiUrl + '/player'
  constructor(private http:HttpClient) { }

  uploadImage(file:File):Observable<{url:string}>{
    const formData = new FormData();
    formData.append('image',file);

    return this.http.post<{url:string}>(`${this.apiUrl}/upload`,formData);
  }

    getPlayers(): Observable<Player[]>{
      return this.http.get<Player[]>(`${this.apiUrl}`);
    }
  
    getPlayerById(idPlayer:number):Observable<Player>{
      return this.http.get<Player>(`${this.apiUrl}/${idPlayer}`);
    }
  
    createPlayer(idCategority:number,formData:FormData):Observable<Player>{
      return this.http.post<Player>(`${this.apiUrl}/create/${idCategority}`,formData);
    }
  
    updatePlayer(idPlayer:number, player:Player):Observable<Player>{
      return this.http.patch<Player>(`${this.apiUrl}/${idPlayer}`,player);
    }
  
    deletePlayer(idPlayer:number):Observable<Player>{
      return this.http.delete<Player>(`${this.apiUrl}/${idPlayer}`);
    }
}
