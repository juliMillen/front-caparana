import { Routes } from '@angular/router';
import { ClubComponent } from './components/club/club.component';
import { CategoritiesComponent } from './components/categorities/categorities.component';
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { PlayersComponent } from './components/players/players.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { ExecutivesComponent } from './components/executives/executives.component';
import { ReportsComponent } from './components/reports/reports.component';
import { FooterComponent } from './components/footer/footer.component';

export const routes: Routes = [
    {path: 'club', component:ClubComponent},
    {path:'categority',component:CategoritiesComponent},
    {path:'categority/:id',component:CategoritiesComponent},
    {path:'discipline',component:DisciplinesComponent},
    {path:'discipline/:id',component:DisciplinesComponent},
    {path:'report',component:ReportsComponent},
    {path:'report/:id',component:ReportsComponent},
    {path:'executive',component:ExecutivesComponent},
    {path:'executive/:id',component:ExecutivesComponent},
    {path:'player',component:PlayersComponent},
    {path:'player/id',component:PlayersComponent},
    {path:'sponsor',component:SponsorsComponent},
    {path:'sponsor/id',component:SponsorsComponent},
    {path:'footer',component:FooterComponent}

];
