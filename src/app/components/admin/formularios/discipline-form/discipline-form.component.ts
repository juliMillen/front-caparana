import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Discipline } from '../../../../models/discipline';

@Component({
  selector: 'app-discipline-form',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './discipline-form.component.html',
  styleUrl: './discipline-form.component.css'
})
export class DisciplineFormComponent implements OnInit{

  disciplineForm!: FormGroup;

  @Output() disciplineCreated = new EventEmitter<Discipline>();
  @Output() disciplineUpdated = new EventEmitter<Discipline>();
  @Output() closedModal = new EventEmitter<void>()

  constructor(private fb:FormBuilder){}

  ngOnInit():void{
    this.disciplineForm = this.fb.group({
      nameDiscipline:['',Validators.required],
      description:['',Validators.required],
      schedule:['',Validators.required],
      professorAsig:['',Validators.required],
      ubication:['',Validators.required]
    });
  }

  createDiscipline():void{
    if(this.disciplineForm.invalid){
      this.disciplineForm.markAllAsTouched();
      return;
    }

    const discipline: Discipline = {
      idDiscipline: 0,
      nameDiscipline:this.disciplineForm.value.nameDiscipline,
      description:this.disciplineForm.value.description,
      schedule:this.disciplineForm.value.schedule,
      professorAsig:this.disciplineForm.value.professorAsig,
      ubication:this.disciplineForm.value.ubication
    };
    this.disciplineCreated.emit(discipline);
  }

  updateDiscipline():void{
     if(this.disciplineForm.invalid){
      this.disciplineForm.markAllAsTouched();
      return;
    }

    const discipline: Discipline = {
      idDiscipline: 0,
      nameDiscipline:this.disciplineForm.value.nameDiscipline,
      description:this.disciplineForm.value.description,
      schedule:this.disciplineForm.value.schedule,
      professorAsig:this.disciplineForm.value.professorAsig,
      ubication:this.disciplineForm.value.ubication
    };
    this.disciplineUpdated.emit(discipline);
  }

  closeModal():void{
    this.disciplineForm.reset();
    this.closedModal.emit();
  }

}
