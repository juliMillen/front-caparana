import { Routes } from '@angular/router';
import { ClubComponent } from './components/club/club.component';
import { CategoritiesComponent } from './components/categorities/categorities.component';
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { PlayersComponent } from './components/players/players.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { ExecutivesComponent } from './components/executives/executives.component';
import { ReportsComponent } from './components/reports/reports.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LogginComponent } from './components/loggin/loggin.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { DisciplinesAdminComponent } from './components/admin/disciplines-admin/disciplines-admin.component';
import { ExecutivesAdminComponent } from './components/admin/executives-admin/executives-admin.component';
import { GalleryAdminComponent } from './components/admin/gallery-admin/gallery-admin.component';
import { PlayersAdminComponent } from './components/admin/players-admin/players-admin.component';
import { ReportsAdminComponent } from './components/admin/reports-admin/reports-admin.component';
import { SponsorsAdminComponent } from './components/admin/sponsors-admin/sponsors-admin.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { CategoritiesAdminComponent } from './components/admin/categorities-admin/categorities-admin.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path: 'club', component:ClubComponent},
    {path:'categority',component:CategoritiesComponent},
    {path:'categority/:id',component:CategoritiesComponent},
    {path:'discipline',component:DisciplinesComponent},
    {path:'discipline/:id',component:DisciplinesComponent},
    {path:'report',component:ReportsComponent},
    {path:'report/:id',component:ReportsComponent},
    {path:'gallery/id',component:GalleryComponent},
    {path:'executive',component:ExecutivesComponent},
    {path:'executive/:id',component:ExecutivesComponent},
    {path:'player',component:PlayersComponent},
    {path:'player/id',component:PlayersComponent},
    {path:'sponsor',component:SponsorsComponent},
    {path:'sponsor/id',component:SponsorsComponent},
    {path:'footer',component:FooterComponent},
    {path:'login',component:LogginComponent},
    {path:'admin',component: AdminLayoutComponent, children: [
    {path:'dashboard',component:DashboardComponent},
    {path:'club-admin',component:ClubComponent},
    {path:'disciplines-admin',component:DisciplinesAdminComponent},
    {path:'executives-admin',component:ExecutivesAdminComponent},
    {path:'gallery-admin',component:GalleryAdminComponent},
    {path:'players-admin',component:PlayersAdminComponent},
    {path:'reports-admin',component:ReportsAdminComponent},
    {path:'sponsors-admin',component:SponsorsAdminComponent},
    {path:'categorities-admin',component:CategoritiesAdminComponent}
    ]}

];
