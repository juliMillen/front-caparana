import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatchFormComponent } from '../formularios/match-form/match-form.component';
import { Match } from '../../../models/match';
import { MatchService } from '../../../services/match.service';

@Component({
  selector: 'app-match-admin',
  imports: [CommonModule,MatchFormComponent],
  templateUrl: './match-admin.component.html',
  styleUrl: './match-admin.component.css'
})
export class MatchAdminComponent implements OnInit{
  matches:Match[] = [];

  showModal: boolean = false;

  selectedMatch: Match | null = null;

  constructor(private matchService:MatchService){}

  ngOnInit(): void {
    this.getMatches();
  }

  getMatches():void{
    this.matchService.getMatches().subscribe({
      next:(data) => {
        this.matches = data;
      },
      error:(err) => {
        console.error('Error al obtener partidos',err);
      }
    })
  }

  openModal():void{
    this.selectedMatch = null;
    this.showModal = true;
  }

  openEditModal(match:Match):void{
    this.selectedMatch = match;
    this.showModal = true;
  }

  closeModal():void{
    this.showModal = false;
  }

  createMatch(match:Match):void{
    this.matchService.createMatch(match).subscribe({
      next:(data) => {
        this.matches.push(data);
        this.showModal = false;
      },
      error:(err) => {
        console.error('Error al crear el partido',err);
      }
    })
  }

  updateMatch(match:Match):void{
    this.matchService.updateMatch(match.idMatch,match).subscribe({
      next:(data) => {
        this.matches = this.matches.map(
          m => m.idMatch === data.idMatch ? data : m
        );
      },
      error:(err) => {
        console.error('Error al editar partido',err);
      }
    })
  }

  deleteMatch(idMatch:number):void{
    this.matchService.deleteMatch(idMatch).subscribe({
      next:() => {
        this.matches = this.matches.filter(
          m => m.idMatch !== idMatch
        )
      },
      error: (err) =>{
        console.error('Error al eliminar partido',err);
      }
    })
  }
}
