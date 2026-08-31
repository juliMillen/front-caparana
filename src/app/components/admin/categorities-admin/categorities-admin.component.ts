import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Categority } from '../../../models/categority';
import { CategorityService } from '../../../services/categority.service';

@Component({
  selector: 'app-categorities-admin',
  imports: [CommonModule],
  templateUrl: './categorities-admin.component.html',
  styleUrl: './categorities-admin.component.css'
})
export class CategoritiesAdminComponent implements OnInit {

  categorities: Categority[] = [];

  constructor(private categorityService:CategorityService){}

  ngOnInit(): void {
    this.getCategorities();
  }

  getCategorities():void{
    this.categorityService.getCategorities().subscribe({
      next: (data) =>{
        this.categorities = data;
      },
      error: (err) =>{
        console.error("Error al obtener categorias ",err);
      }
    })
  }

}
