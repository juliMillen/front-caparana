import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Club } from '../../../models/club';
import { ClubService } from '../../../services/club.service';
import { ClubFormComponent } from "../formularios/club-form/club-form.component";

@Component({
  selector: 'app-club-admin',
  imports: [CommonModule, ClubFormComponent],
  templateUrl: './club-admin.component.html',
  styleUrl: './club-admin.component.css'
})
export class ClubAdminComponent implements OnInit {
  club!: Club;
  showModal: boolean = false;

  constructor(private clubService:ClubService){}

  ngOnInit(): void {
    this.getClub();
  }

  getClub():void{
    this.clubService.getClubById(1).subscribe({
      next:(data) => {
        this.club = data;
      },
      error:(err) =>{
        console.error("Error al obtener club",err);
      }
    });
  }

  openModal():void{
    this.showModal = true;
  }

  closeModal():void{
    this.showModal=false;
  }

  updateClub(club:Club):void{
    this.clubService.updateClub(this.club.idClub,club).subscribe({
      next:(data) => {
        this.club = data;
        this.showModal = false;
      },
      error: (err) => {
        console.error("Error al editar club",err);
      }
    });
  }

}
