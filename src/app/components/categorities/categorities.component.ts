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

 positions: string[] = [
  'Goalkeeper',
  'Defender',
  'Midfielder',
  'Forward'
 ]

 private singularLabels: Record<string,string> = {
  Goalkeeper:'Arquero',
  Defender:'Defensa',
  Midfielder:'Mediocampista',
  Forward:'Delantero'
 }

 constructor(private categorityService:CategorityService){
  
 }

 ngOnInit(): void {
   this.getCategorities();
 }

 getCategorities():void{
  this.categorityService.getCategorities().subscribe({
    next:(data) =>{
      this.categorities = data.filter(
        category => category.nameCategority !== "Plantel Profesional"
      );
    },
    error: (err) =>{
      console.error('Error al cargar las categorias',err);
    }
  })
 }

 getSingularLabel(position:string):string{
  return this.singularLabels[position] ?? position;
 }


}
