import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Player } from '../../../models/player';
import { PlayerService } from '../../../services/player.service';
import { FormsModule } from '@angular/forms';
import { PlayerFormComponent } from '../formularios/player-form/player-form.component';

@Component({
  selector: 'app-players-admin',
  imports: [CommonModule, FormsModule, PlayerFormComponent],
  templateUrl: './players-admin.component.html',
  styleUrl: './players-admin.component.css'
})
export class PlayersAdminComponent  implements OnInit{
players: Player[] = [];
filteredPlayers: Player[] = [];

searchId: number | null = null;
searchSurname: string = '';
searchName: string = '';

selectedPlayer: Player | null = null;

showModal: boolean = false;

constructor(private playerService:PlayerService){}

ngOnInit(): void {
  this.getPlayers();
}

openEditModal(player:Player):void{
  this.selectedPlayer = player;
  this.showModal = true;
}

closeModal():void{
  this.showModal = false;
}

getPlayers():void{
  this.playerService.getPlayers().subscribe({
    next:(data) => {
      //console.log("Jugadores: ",data)
      this.players = data;
      this.filteredPlayers = data;
    },
    error:(err) =>{
      console.error('Error al obtener jugadores ',err);
    }
  })
}

filterPlayers():void{
  this.filteredPlayers = this.players.filter(player =>{
    const matchesId = this.searchId === null || player.idPlayer === this.searchId;
    
    const matchesSurname = this.searchSurname.trim() === '' || player.surname.toLowerCase().includes(this.searchSurname.toLowerCase());

    const matchesName = this.searchName.trim() === '' || player.name.toLowerCase().includes(this.searchName.toLowerCase());
    return matchesId && matchesSurname && matchesName;
  });
}

updatePlayer(data:{player:Player,file:File | null}):void{
  this.playerService.updatePlayer(data.player.idPlayer,this.buildFormData(data)).subscribe({
    next:(updated) => {
      this.players = this.players.map(
        e => e.idPlayer === updated.idPlayer ? updated : e
      );
      this.showModal = false;
      this.selectedPlayer = null;
    },
    error:(err) => {
      console.error('Error al actualizar jugador',err);
    }
  })
}

private buildFormData(data:{player:Player, file:File | null}){
  const formData = new FormData();
  formData.append('name',data.player.name);
  formData.append('surname',data.player.surname);
  formData.append('position',data.player.position);
  formData.append('num',data.player.num.toString())
  if(data.file){
    formData.append('image',data.file)
  }
  return formData;
}


deletePlayer(idPlayer:number):void{
  this.playerService.deletePlayer(idPlayer).subscribe({
    next:() =>{
      this.players = this.players.filter(e => e.idPlayer !== idPlayer)
    },
    error:(err) =>{
      console.error('Error al eliminar jugador',err);
    }
  });
}
}
