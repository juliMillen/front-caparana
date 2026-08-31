import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Discipline } from '../../../models/discipline';
import { DisciplineService } from '../../../services/discipline.service';

@Component({
  selector: 'app-disciplines-admin',
  imports: [CommonModule],
  templateUrl: './disciplines-admin.component.html',
  styleUrl: './disciplines-admin.component.css'
})
export class DisciplinesAdminComponent implements OnInit {
  disciplines: Discipline[] = [];

  constructor(private disciplineService:DisciplineService){}

  ngOnInit(): void {
    this.getDisciplines();
  }

  getDisciplines():void{
    this.disciplineService.getDisciplines().subscribe({
      next:(data) =>{
        this.disciplines = data;
      },
      error:(err)=>{
        console.error("Error al obtener disciplinas");
      }
    })
  }
}
