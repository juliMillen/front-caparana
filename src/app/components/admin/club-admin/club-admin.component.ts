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

  createClub(data: {club:Club,fileStadium:File | null, fileShield:File | null}):void{
    const formData = new FormData();
    formData.append('name',data.club.name);
    formData.append('fundationDate',data.club.fundationDate);
    formData.append('history',data.club.history);
    formData.append('stadiumHistory',data.club.stadiumHistory);
    formData.append('colorsHistory',data.club.colorsHistory);

    if(data.fileShield && data.fileStadium){
      formData.append('imageShield',data.fileShield),
      formData.append('imageStadium',data.fileStadium);
    }
    this.clubService.createClub(formData).subscribe({
      next:(data) => {
        this.club = data;
        this.showModal = false;
      },
      error: (err) => {
        console.error('Error al crear el club',err);
      }
    })


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
