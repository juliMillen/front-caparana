import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Discipline } from '../../../../models/discipline';

@Component({
  selector: 'app-discipline-form',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './discipline-form.component.html',
  styleUrl: './discipline-form.component.css'
})
export class DisciplineFormComponent implements OnInit{

  @Input() discipline: Discipline | null = null;
  disciplineForm!: FormGroup;

  @Output() disciplineCreated = new EventEmitter<Discipline>();
  @Output() disciplineUpdated = new EventEmitter<Discipline>();
  @Output() closedModal = new EventEmitter<void>()

  constructor(private fb:FormBuilder){}

  get isEditMode():boolean{
    return !!this.discipline;
  }

  ngOnInit():void{
    this.disciplineForm = this.fb.group({
      nameDiscipline:[this.discipline?.nameDiscipline ?? '',Validators.required],
      description:[this.discipline?.description ?? '',Validators.required],
      schedule:[this.discipline?.schedule ?? '',Validators.required],
      professorAsig:[this.discipline?.professorAsig ?? '',Validators.required],
      ubication:[this.discipline?.ubication ?? '',Validators.required]
    });
  }

  onSubmit():void{
    if(this.isEditMode){
      this.updateDiscipline();
    } else {
      this.createDiscipline();
    }
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
     if(this.disciplineForm.invalid || !this.discipline){
      this.disciplineForm.markAllAsTouched();
      return;
    }

    const disciplineUpdated: Discipline = {
      idDiscipline: this.discipline.idDiscipline,
      nameDiscipline:this.disciplineForm.value.nameDiscipline,
      description:this.disciplineForm.value.description,
      schedule:this.disciplineForm.value.schedule,
      professorAsig:this.disciplineForm.value.professorAsig,
      ubication:this.disciplineForm.value.ubication
    };
    this.disciplineUpdated.emit(disciplineUpdated);
  }

  closeModal():void{
    this.disciplineForm.reset();
    this.closedModal.emit();
  }

}
