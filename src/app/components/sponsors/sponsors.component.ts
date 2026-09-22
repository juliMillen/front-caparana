import { Component, OnInit } from '@angular/core';
import { SponsorService } from '../../services/sponsor.service';
import { CommonModule } from '@angular/common';
import { Sponsor } from '../../models/sponsor';

@Component({
  selector: 'app-sponsors',
  imports: [CommonModule],
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.css'
})
export class SponsorsComponent implements OnInit{

  sponsors: Sponsor[] = [];

  displaySponsors: Sponsor[] = [] //duplico el array para usar en ngFor del carrusel

  constructor(private sponsorService:SponsorService){

  }

  ngOnInit(): void {
   this.getSponsors();
  }

  getSponsors():void{
    this.sponsorService.getSponsors().subscribe({
      next:(data) => {
        this.sponsors = data;
        this.buildDisplaySponsors();
      },
      error: (err) =>{
        console.log('Error al obtener sponsors',err);
      }
    })
  }

  private buildDisplaySponsors():void {
    if(this.sponsors.length === 0){
      this.displaySponsors = [];
      return;
    }

    const minItemsForSmoothLoop = 6;
    let repeated = [...this.sponsors];

    //si hay pocos sponsors repetimos mas veces

    while(repeated.length < minItemsForSmoothLoop){
      repeated = [...repeated, ...this.sponsors];
    }

    this.displaySponsors = [...repeated, ...repeated];
  }

}
