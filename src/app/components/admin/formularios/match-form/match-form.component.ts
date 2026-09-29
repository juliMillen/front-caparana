import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Match } from '../../../../models/match';

@Component({
  selector: 'app-match-form',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './match-form.component.html',
  styleUrl: './match-form.component.css'
})
export class MatchFormComponent implements OnInit{
  @Input() match:Match | null = null;
  matchForm!:FormGroup;

  @Output() matchCreated = new EventEmitter<Match>();
  @Output() matchUpdated = new EventEmitter<Match>();
  @Output() closedModal = new EventEmitter<void>();

  constructor(private fb:FormBuilder){}

  get isEditMode():boolean{
    return !!this.match;
  }

  ngOnInit(): void {
    this.matchForm = this.fb.group({
      rival:[this.match?.rival ?? '', Validators.required],
      dateTime:[this.match?.dateTime ?? '',Validators.required],
      location:[this.match?.location ?? '',Validators.required],
      teamGoals:[this.match?.teamGoals ?? 0,Validators.required],
      rivalGoals:[this.match?.rivalGoals ?? 0, Validators.required],
      state:[this.match?.state ?? '',Validators.required]
    });
  }

  onSubmit():void{
    if(this.isEditMode){
      this.updateMatch();
    }else{
      this.createMatch();
    }
  }

  createMatch():void{
    if(this.matchForm.invalid){
      this.matchForm.markAllAsTouched();
      return;
    }

    const match:Match= {
      idMatch:0,
      rival:this.matchForm.value.rival,
      dateTime:this.matchForm.value.dateTime,
      location:this.matchForm.value.location,
      teamGoals:this.matchForm.value.teamGoals,
      rivalGoals:this.matchForm.value.rivalGoals,
      state:this.matchForm.value.state
    };
    this.matchCreated.emit(match);
  }

  updateMatch():void{
    if(this.matchForm.invalid || !this.match){
      this.matchForm.markAllAsTouched();
      return;
    }
     const match:Match = {
      idMatch: this.match.idMatch,
      rival:this.matchForm.value.rival,
      dateTime:this.matchForm.value.dateTime,
      location:this.matchForm.value.location,
      teamGoals:this.matchForm.value.teamGoals,
      rivalGoals:this.matchForm.value.rivalGoals,
      state:this.matchForm.value.state
     };
     this.matchUpdated.emit(match);


  }

  closeModal():void{
    this.matchForm.reset();
    this.closedModal.emit();
  }
}
