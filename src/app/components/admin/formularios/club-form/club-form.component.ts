import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Club } from '../../../../models/club';

@Component({
  selector: 'app-club-form',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './club-form.component.html',
  styleUrl: './club-form.component.css'
})
export class ClubFormComponent implements OnInit{

  clubForm!:FormGroup;
  titles?: String[] = [];


  @Input() club!:Club;
  @Output() clubUpdated = new EventEmitter<Club>();
  @Output() closedModal = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clubForm = this.fb.group({
      history:['',Validators.required],
      colorsHistory:['',Validators.required],
      stadiumHistory:['',Validators.required]
    });
    this.clubForm.patchValue({
      history:this.club.history,
      colorsHistory:this.club.colorsHistory,
      stadiumHistory:this.club.stadiumHistory
    });
  }

  updateClub():void{
    if(this.clubForm.invalid){
      this.clubForm.markAllAsTouched();
      return;
    }

    const clubUpdated: Club = {
      idClub: this.club.idClub,
      name:this.club.name,
      fundationDate:this.club.fundationDate,
      history:this.club.history,
      colorsHistory:this.club.colorsHistory,
      stadiumHistory:this.club.stadiumHistory,
      titles: this.club.titles,
      urlImageShield:this.club.urlImageShield,
      urlImageStadium:this.club.urlImageStadium
    };
    this.clubUpdated.emit(clubUpdated);
  }

  closeModal():void{
    this.clubForm.reset();
    this.closedModal.emit();
  }

}
