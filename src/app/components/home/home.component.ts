import { Component } from '@angular/core';
import { ReportsComponent } from "../reports/reports.component";
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { GalleryCarouselComponent } from '../gallery-carousel/gallery-carousel.component';
import { SponsorsComponent } from '../sponsors/sponsors.component';

@Component({
  selector: 'app-home',
  imports: [ReportsComponent, RouterLink, NavbarComponent, FooterComponent, GalleryCarouselComponent, SponsorsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
