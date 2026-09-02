import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Discipline } from '../../../models/discipline';
import { DisciplineService } from '../../../services/discipline.service';
import { FormsExecutivesComponent } from "../formularios/forms-executives/forms-executives.component";
import { DisciplineFormComponent } from "../formularios/discipline-form/discipline-form.component";

@Component({
  selector: 'app-disciplines-admin',
  imports: [CommonModule, FormsExecutivesComponent, DisciplineFormComponent],
  templateUrl: './disciplines-admin.component.html',
  styleUrl: './disciplines-admin.component.css'
})
export class DisciplinesAdminComponent implements OnInit {
  disciplines: Discipline[] = [];

  showModal: boolean = false;

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

  openModal():void{
    this.showModal = true;
  }

  openEditModal():void{
    this.showModal = true;
  }

  closeModal():void{
    this.showModal = false;
  }

  createDiscipline(discipline:Discipline):void{
    this.disciplineService.createDiscipline(discipline).subscribe({
      next:(data) => {
        this.disciplines.push(data);
        this.showModal = false;
      },
      error: (err) => {
        console.error("Error al crear la disciplina", err);
      }
    })
  }


  updateDiscipline(discipline:Discipline):void{
    this.disciplineService.updateDiscipline(discipline.idDiscipline,discipline).subscribe({
      next:(data) => {
        this.disciplines.push(data);
        this.showModal = false;
      },
      error:(err) => {
        console.error("Error al actualizar la disciplina",err);
      }
    })
  }

  deleteDiscipline(idDiscipline:number):void{
    this.disciplineService.deleteDiscipline(idDiscipline).subscribe({
      next:() => {
        this.disciplines = this.disciplines.filter(
          e=> e.idDiscipline !== idDiscipline
        )
      },
      error: (err) => {
        console.error("Error al eliminar la disciplina",err);
      }
    })
  }


}
