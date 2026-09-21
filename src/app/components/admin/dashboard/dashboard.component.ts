import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface DashboardSection {
  title: string;
  description: string;
  icon: string;      // clase de Bootstrap Icons
  route: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

 sections: DashboardSection[] = [
    { title: 'Historia',          description: 'Datos generales, historia y estadio del club', icon: 'bi-clock-history',    route: '/admin/club-admin' },
    { title: 'Ejecutivos',        description: 'Comisión directiva y cargos',                   icon: 'bi-person-badge',     route: '/admin/executives-admin' },
    { title: 'Disciplinas',       description: 'Deportes y actividades del club',                icon: 'bi-trophy',           route: '/admin/disciplines-admin' },
    { title: 'Categorías',        description: 'Categorías por disciplina',                       icon: 'bi-list-ul',          route: '/admin/categorities-admin' },
    { title: 'Jugadores',         description: 'Jugadores de todas las categorías',               icon: 'bi-people',           route: '/admin/players-admin' },
    { title: 'Sponsors',          description: 'Patrocinadores del club',                         icon: 'bi-briefcase',        route: '/admin/sponsors-admin' },
    { title: 'Galería de fotos',  description: 'Imágenes y eventos del club',                     icon: 'bi-images',           route: '/admin/gallery-admin' },
    { title: 'Noticias',          description: 'Publicaciones y novedades',                       icon: 'bi-newspaper',        route: '/admin/reports-admin' },
  ];
}
