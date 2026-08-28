import { Component, OnInit } from '@angular/core';
import { SponsorService } from '../../services/sponsor.service';
import { Sponsor } from '../../models/sponsor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sponsors',
  imports: [CommonModule],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.css'
})
export class SponsorsComponent implements OnInit{

  sponsors: Sponsor[] = [];

  constructor(private sponsorService:SponsorService){

  }

  ngOnInit(): void {
    this.getSponsors()
  }

  getSponsors():void{
    this.sponsorService.getSponsors().subscribe({
      next:(data) => {
        this.sponsors = data;
      },
      error: (err) =>{
        console.log('Error al obtener sponsors');
      }
    })
  }

}
