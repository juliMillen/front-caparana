import { Component } from '@angular/core';
import { GalleryComponent } from "../gallery/gallery.component";
import { ReportsComponent } from "../reports/reports.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [GalleryComponent, ReportsComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
