import { Component, OnInit } from '@angular/core';
import { Club } from '../../models/club';
import { ClubService } from '../../services/club.service';

@Component({
  selector: 'app-club',
  imports: [],
  templateUrl: './club.component.html',
  styleUrl: './club.component.css'
})
export class ClubComponent implements OnInit {

  club?: Club;

  constructor(private clubService: ClubService){

  }

  ngOnInit(): void {
    this.obtenerClub();
  }

  obtenerClub():void{
    this.clubService.getClubById(1).subscribe({
      next: (data) => {
        this.club = data;
      },
      error: (err) =>{
        console.error('Error al obtener el club',err);
      }
    });
  }

}
