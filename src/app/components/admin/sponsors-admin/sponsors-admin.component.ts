import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Sponsor } from '../../../models/sponsor';
import { SponsorService } from '../../../services/sponsor.service';
import { SponsorFormsComponent } from '../formularios/sponsor-forms/sponsor-forms.component';

@Component({
  selector: 'app-sponsors-admin',
  imports: [CommonModule,SponsorFormsComponent],
  templateUrl: './sponsors-admin.component.html',
  styleUrl: './sponsors-admin.component.css'
})
export class SponsorsAdminComponent implements OnInit {

  sponsors: Sponsor[] = [];

  showModal: boolean = false;

  constructor(private sponsorService:SponsorService){
  }

  ngOnInit(): void {
    this.getSponsors();
  }

  getSponsors():void{
    this.sponsorService.getSponsors().subscribe({
      next: (data) => {
        this.sponsors = data;
      },
      error: (err) => {
        console.error('Error al obtener sponsors',err);
      }
    })
  }

  openModal():void{
    this.showModal = true;
  }

  closeModal():void{
    this.showModal = false;
  }

  createSponsor(sponsor:Sponsor):void{
    this.sponsorService.createSponsor(sponsor).subscribe({
      next:(data) => {
        this.sponsors.push(data);
        this.showModal = false;
      },
      error: (err) => {
        console.error('Error al crear el sponsor',err);
      }
    })
  }

  deleteSponsor(idSponsor:number):void{
    this.sponsorService.deleteSponsor(idSponsor).subscribe({
      next:() => {
        this.sponsors = this.sponsors.filter(
          e => e.idSponsor !== idSponsor
        )
      },
      error: (err) => {
        console.error('Error al eliminar el sponsor',err);
      }
    })
  }
}
