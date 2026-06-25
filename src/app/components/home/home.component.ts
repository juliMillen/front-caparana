import { Component } from '@angular/core';
import { GalleryComponent } from "../gallery/gallery.component";
import { ReportsComponent } from "../reports/reports.component";

@Component({
  selector: 'app-home',
  imports: [GalleryComponent, ReportsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
