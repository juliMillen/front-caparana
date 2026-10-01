import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatchFormComponent } from '../formularios/match-form/match-form.component';
import { Match } from '../../../models/match';
import { MatchService } from '../../../services/match.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-match-admin',
  imports: [CommonModule,MatchFormComponent,FormsModule],
  templateUrl: './match-admin.component.html',
  styleUrl: './match-admin.component.css'
})


export class MatchAdminComponent implements OnInit{
  matches:Match[] = [];

  filteredMatches: Match[] = [];

  searchId: number | null = null;

  showModal: boolean = false;

  selectedMatch: Match | null = null;

  constructor(private matchService:MatchService){}

  ngOnInit(): void {
    this.getMatches();
  }

  stateLabels: Record<string,string> = {
    Schedule: 'Programado',
    InProgress: 'En curso',
    Finished: 'Finalizado'
  };

  getStateLabel(state:string):string{
    return this.stateLabels[state] ?? state;
  }

  getMatchById():void{
    if(this.searchId === null){
      this.filteredMatches = this.matches;
      return;
    }

    this.matchService.getMatchById(this.searchId).subscribe({
      next:(data) =>{
        this.filteredMatches = data ? [data] : [];
      },
      error: (err)  => {
        console.error('Error al obtener el partido',err);
      }
    })
  }

  clearSearch():void{
    this.searchId = null;
    this.filteredMatches = this.matches;
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

  createMatch(data: {match:Match, file:File | null}):void{
    this.matchService.createMatch(this.buildFormData(data)).subscribe({
      next:(data) => {
        this.matches.push(data);
        this.showModal = false;
      },
      error:(err) => {
        console.error('Error al crear el partido',err);
      }
    })
  }

  updateMatch(data:{match:Match,file:File | null}):void{
    this.matchService.updateMatch(data.match.idMatch,this.buildFormData(data)).subscribe({
      next:(data) => {
        this.matches = this.matches.map(
          m => m.idMatch === data.idMatch ? data : m
        );
        this.showModal=false;
        this.selectedMatch=null;
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

  private buildFormData(data:{match:Match, file:File|null}){
    const formData = new FormData();
    formData.append('rival',data.match.rival);
    formData.append('dateTime',data.match.dateTime);
    formData.append('location',data.match.location);
    formData.append('teamGoals',data.match.teamGoals.toString());
    formData.append('rivalGoals',data.match.rivalGoals.toString());
    formData.append('state',data.match.state);
    if(data.file){
      formData.append('image',data.file);
    }
    return formData;
  }
}
