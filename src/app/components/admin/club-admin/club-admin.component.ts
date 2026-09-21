import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
  club : Club | null = null;
  showModal: boolean = false;
  loading = true;

  constructor(private clubService:ClubService){}

  ngOnInit(): void {
    this.getClub();
  }

  createClub(data: {club:Club,fileStadium:File | null, fileShield:File | null}):void{

    this.clubService.createClub(this.buildFormData(data)).subscribe({
      next:(created) => {
        this.club = created;
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
        this.loading = false;
      },
      error:(err) =>{
        this.loading = false;
        if(err.status !== 404){
          console.error('Error al obtener club',err);
        }
      }
    });
  }

  openModal():void{
    this.showModal = true;
  }

  closeModal():void{
    this.showModal=false;
  }

  updateClub(data:{club:Club, fileStadium:File | null, fileShield:File | null}):void{
    if(!this.club) return;
    this.clubService.updateClub(this.club.idClub, this.buildFormData(data)).subscribe({
      next:(updated) => {
        this.club = updated;
        this.showModal = false;
      },
      error: (err) => {
        console.error('Error al actualizar club',err);
      }
    })
  }

    private buildFormData(data:{club:Club, fileStadium:File | null, fileShield:File | null}){
    const formData = new FormData();
    formData.append('name',data.club.name);
    formData.append('fundationDate',data.club.fundationDate);
    formData.append('history',data.club.history);
    formData.append('stadiumHistory',data.club.stadiumHistory);
    formData.append('colorsHistory',data.club.colorsHistory);

    if(data.fileShield){
      formData.append('imageShield',data.fileShield)
    }

    if(data.fileStadium){
      formData.append('imageStadium',data.fileStadium);
    }
    return formData;
    
  }

}
