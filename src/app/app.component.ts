import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClubComponent } from "./components/club/club.component";
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { ReportsComponent } from './components/reports/reports.component';
import { PlayersComponent } from './components/players/players.component';
import { ExecutivesComponent } from './components/executives/executives.component';
import { CategoritiesComponent } from './components/categorities/categorities.component';
import { GalleryComponent } from "./components/gallery/gallery.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ClubComponent, DisciplinesComponent, NavbarComponent, SponsorsComponent, ReportsComponent, PlayersComponent, ExecutivesComponent, CategoritiesComponent, GalleryComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'caparana-front';
}
