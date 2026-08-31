import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Sponsor } from '../../../models/sponsor';
import { SponsorService } from '../../../services/sponsor.service';

@Component({
  selector: 'app-sponsors-admin',
  imports: [CommonModule],
  templateUrl: './sponsors-admin.component.html',
  styleUrl: './sponsors-admin.component.css'
})
export class SponsorsAdminComponent implements OnInit {

  sponsors: Sponsor[] = [];

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
        console.error("Error al obtener sponsors");
      }
    })
  }
}
