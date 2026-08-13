import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Categority } from '../../models/categority';
import { CategorityService } from '../../services/categority.service';


@Component({
  selector: 'app-categorities',
  imports: [CommonModule],
  templateUrl: './categorities.component.html',
  styleUrl: './categorities.component.css'
})
export class CategoritiesComponent implements OnInit {

 categorities: Categority[] = []

 constructor(private categorityService:CategorityService){
  
 }

 ngOnInit(): void {
   this.getCategorities();
 }

 getCategorities():void{
  this.categorityService.getCategorities().subscribe({
    next:(data) =>{
      this.categorities = data;
    },
    error: (err) =>{
      console.error('Error al cargar las categorias',err);
    }
  })
 }

}
