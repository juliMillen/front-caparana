import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Discipline } from '../../../models/discipline';
import { DisciplineService } from '../../../services/discipline.service';
import { DisciplineFormComponent } from "../formularios/discipline-form/discipline-form.component";

@Component({
  selector: 'app-disciplines-admin',
  imports: [CommonModule, DisciplineFormComponent],
  templateUrl: './disciplines-admin.component.html',
  styleUrl: './disciplines-admin.component.css'
})
export class DisciplinesAdminComponent implements OnInit {
  disciplines: Discipline[] = [];

  showModal: boolean = false;

  selectedDiscipline: Discipline | null = null;

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
        console.error("Error al obtener disciplinas",err);
      }
    })
  }

  openModal():void{
    this.selectedDiscipline = null;
    this.showModal = true;
  }

  openEditModal(discipline:Discipline):void{
    this.selectedDiscipline = discipline;
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
        console.error('Error al crear la disciplina', err);
      }
    })
  }


  updateDiscipline(discipline:Discipline):void{
    this.disciplineService.updateDiscipline(discipline.idDiscipline,discipline).subscribe({
      next:(data) => {
        this.disciplines = this.disciplines.map(
          d => d.idDiscipline === data.idDiscipline ? data : d
        );
        this.showModal = false;
        this.selectedDiscipline = null;
      },
      error:(err) => {
        console.error('Error al actualizar la disciplina',err);
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
        console.error('Error al eliminar la disciplina',err);
      }
    })
  }


}
