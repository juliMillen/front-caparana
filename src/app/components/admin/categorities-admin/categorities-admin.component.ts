import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Categority } from '../../../models/categority';
import { CategorityService } from '../../../services/categority.service';
import { CategorityFormsComponent } from '../formularios/categority-forms/categority-forms.component';

@Component({
  selector: 'app-categorities-admin',
  imports: [CommonModule,CategorityFormsComponent],
  templateUrl: './categorities-admin.component.html',
  styleUrl: './categorities-admin.component.css'
})
export class CategoritiesAdminComponent implements OnInit {

  categorities: Categority[] = [];
  showModal:boolean = false;

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

  createCategority(categority:Categority):void{
    this.categorityService.createCategority(categority).subscribe({
      next:(data) => {
        this.categorities.push(data);
        this.showModal = false;
      },
      error:(err) => {
        console.error("Error al crear categoria",err);
      }
    });
  }

  openModal():void{
    this.showModal = true;
  }

  closeModal():void{
    this.showModal = false;
  }

}
