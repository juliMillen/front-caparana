import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isAdmin= false;

  constructor(private router:Router, private authService:AuthService){}

  ngOnInit(): void {
    this.isAdmin= this.authService.usuarioLoggeado();
  }

  logout():void{
    this.authService.logout();
    this.isAdmin = false;
    this.router.navigate(['/login']);
  }

  getCategoriesRoute():string{
    return this.isAdmin
    ? '/admin/categorities-admin'
    : '/categority';
  }

  getDisciplinesRoute():string{
    return this.isAdmin
    ? '/admin/disciplines-admin'
    : '/discipline'
  }

  getClubRoute():string{
    return this.isAdmin
    ? '/admin/club-admin'
    : '/club'
  }

  getPlayersRoute():string{
    return this.isAdmin
    ? '/admin/players-admin'
    : '/player'
  }

  getReportsRoute():string{
    return this.isAdmin
    ? '/admin/reports-admin'
    :'/report'
  }

  getSponsorsRoute():string{
    return this.isAdmin
    ?'/admin/sponsors-admin'
    :'/sponsor'
  }

  getGalleryRoute():string{
    return this.isAdmin
    ?'/admin/gallery-admin'
    :'/gallery/1'
  }

  getExecutivesRoute():string{
    return this.isAdmin
    ? '/admin/executives-admin'
    : '/executive'
  }
}
