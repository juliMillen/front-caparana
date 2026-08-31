import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Player } from '../../../models/player';
import { PlayerService } from '../../../services/player.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-players-admin',
  imports: [CommonModule,FormsModule],
  templateUrl: './players-admin.component.html',
  styleUrl: './players-admin.component.css'
})
export class PlayersAdminComponent  implements OnInit{
players: Player[] = [];
filteredPlayers: Player[] = [];

searchId: number | null = null;
searchSurname: string = '';

constructor(private playerService:PlayerService){}

ngOnInit(): void {
  this.getPlayers();
}

getPlayers():void{
  this.playerService.getPlayers().subscribe({
    next:(data) => {
      //console.log("Jugadores: ",data)
      this.players = data;
      this.filteredPlayers = data;
    },
    error:(err) =>{
      console.error("Error al obtener jugadores ",err);
    }
  })
}

filterPlayers():void{
  this.filteredPlayers = this.players.filter(player =>{
    const matchesId = this.searchId === null || player.idPlayer === this.searchId;
    
    const matchesSurname = this.searchSurname.trim() === '' || player.surname.toLowerCase().includes(this.searchSurname.toLowerCase());
    return matchesId && matchesSurname;
  });
}
}
