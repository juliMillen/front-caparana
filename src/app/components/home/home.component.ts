import { Component } from '@angular/core';
import { GalleryComponent } from "../gallery/gallery.component";
import { ReportsComponent } from "../reports/reports.component";
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [GalleryComponent, ReportsComponent, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
