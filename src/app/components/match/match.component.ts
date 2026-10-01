import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Match } from '../../models/match';
import { MatchService } from '../../services/match.service';
import { ClubService } from '../../services/club.service';
import { Club } from '../../models/club';

@Component({
  selector: 'app-match',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css'
})
export class MatchComponent implements OnInit{

  club: Club | null = null;
  liveMatch:Match | null = null;
  lastMatch:Match | null = null;
  nextMatches: Match[] = [];

  private readonly CLUB_ID = 1;

  constructor(private matchService:MatchService, private clubService:ClubService){}

  ngOnInit(): void {
    this.getClub();
    this.getMatches();
  }

  getClub():void{
    this.clubService.getClubById(this.CLUB_ID).subscribe({
      next:(data) =>{
        this.club = data;
      },
      error:(err) =>
        console.error('Error al obtener club',err)
    })
  }

  getMatches():void{
    this.matchService.getMatches().subscribe({
      next:(data) =>{
        const time = (m:Match) => new Date(m.dateTime).getTime();
        this.liveMatch = data.find(m => m.state === 'InProgress') ?? null;

        this.lastMatch = data
        .filter(m =>m.state === 'Finished')
        .sort((a,b)=>time(b) - time(a))[0] ?? null;

        this.nextMatches = data
        .filter(m=> m.state === 'Schedule')
        .sort((a,b)=>time(a) - time(b))
        .slice(0,2);
      },
      error:(err) =>{
        console.error('Error al cargar partidos',err);
      }
    })
  }
}
