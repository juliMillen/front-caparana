import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Discipline } from '../../models/discipline';
import { DisciplineService } from '../../services/discipline.service';

@Component({
  selector: 'app-disciplines',
  imports: [CommonModule],
  templateUrl: './disciplines.component.html',
  styleUrl: './disciplines.component.css'
})
export class DisciplinesComponent implements OnInit {

  disciplines: Discipline[] = []

  constructor(private displineService:DisciplineService) {
  
  }

  ngOnInit(): void {
    this.getDisciplines();
  }

  getDisciplines():void{
    this.displineService.getDisciplines().subscribe({
      next:(data) => {
        this.disciplines = data;
      },
      error: (err) =>{
        console.error('Error al cargar disciplinas')
      }
    })
  }

  getCategories():string[]{
    return [... new Set(this.disciplines.map(d => d.nameDiscipline)) ];
  }

  getDisciplinesByCategory(category:string): Discipline[]{
    return this.disciplines.filter(d => d.nameDiscipline === category);
  }
}
