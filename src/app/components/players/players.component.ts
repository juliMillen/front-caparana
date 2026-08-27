import { Component, OnInit } from '@angular/core';
import { Player } from '../../models/player';
import { PlayerService } from '../../services/player.service';
import { Categority } from '../../models/categority';
import { CategorityService } from '../../services/categority.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-players',
  imports: [CommonModule],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements OnInit {
  categority?: Categority;

  positions: string[] = [
    'Arquero',
    'Defensor',
    'Mediocampista',
    'Delantero'
  ];

  constructor(private categorityService:CategorityService){
    this.getCategorityProfessional();
  }
  ngOnInit(): void {
    this.getCategorityProfessional()
  }

  getCategorityProfessional():void{
    this.categorityService.getCategorities().subscribe({
      next:(data) => {
        this.categority = data.find(
          category => category.nameCategority === "Plantel Profesional"
        );
      },
      error: (err)=>{
        console.log('Error al cargar Plantel Profesional',err);
      }
    })
  }

  getPlayersByPosition(position:string):Player[]{
    return this.categority?.playerList?.filter(
      player => player.position === position
    ) ?? [];
  }

  


}
