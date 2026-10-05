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
    'Goalkeeper',
    'Defender',
    'Midfielder',
    'Forward'
  ];

  private positionLabels: Record<string,string> = {
    Goalkeeper: 'Arqueros',
    Defender: 'Defensores',
    Midfielder: 'Mediocampistas',
    Forward:'Delanteros'
  };

  private singularLabels: Record<string,string> = {
    Goalkeeper:'Arquero',
    Defender:'Defensor',
    Midfielder:'Mediocampista',
    Forward:'Delantero'
  };

  constructor(private categorityService:CategorityService){
    this.getCategorityProfessional();
  }
  ngOnInit(): void {
    this.getCategorityProfessional()
  }


  getPositionLabel(position: string):string {
    return this.positionLabels[position] ?? position;
  }

  getSingularLabel(position:string):string{
    return this.singularLabels[position] ?? position;
  }

  getCategorityProfessional():void{
    this.categorityService.getCategorities().subscribe({
      next:(data) => {
        this.categority = data.find(
          category => category.nameCategority.trim().toLowerCase() === 'plantel profesional'
        );
        console.log('Encontrada:',this.categority);
        console.log('Jugadores:',this.categority?.playerList);
        console.log('Staff Tecnico:',this.categority?.technicalStaff);
        console.log('Posiciones:',this.categority?.playerList.map(p => `"${p.position}"`))
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
