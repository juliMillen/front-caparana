import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Player } from '../models/player';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private apiUrl= environment + '/player'
  constructor(private http:HttpClient) { }

    getPlayers(): Observable<Player[]>{
      return this.http.get<Player[]>(`${this.apiUrl}/`);
    }
  
    getPlayerById(idPlayer:number):Observable<Player>{
      return this.http.get<Player>(`${this.apiUrl}/${idPlayer}`);
    }
  
    createPlayer(player:Player):Observable<Player>{
      return this.http.post<Player>(`${this.apiUrl}/`,player);
    }
  
    updatePlayer(idPlayer:number, player:Player):Observable<Player>{
      return this.http.patch<Player>(`${this.apiUrl}/${idPlayer}`,player);
    }
  
    deletePlayer(idPlayer:number):Observable<Player>{
      return this.http.delete<Player>(`${this.apiUrl}/${idPlayer}`);
    }
}
