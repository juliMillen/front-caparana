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
  selectedFile:File | null = null;


  @Output() clubCreated = new EventEmitter<{club:Club,fileStadium:File | null ,fileShield:File | null }>();
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
      history:this.clubForm.value.history,
      colorsHistory:this.clubForm.value.colorsHistory,
      stadiumHistory:this.clubForm.value.stadiumHistory
    });
  }

  createClub():void{
    if(this.clubForm.invalid){
      this.clubForm.markAllAsTouched();
      return;
    }

    const club:Club = {
      idClub:0,
      name:this.clubForm.value.name,
      fundationDate:this.clubForm.value.fundationDate,
      history:this.clubForm.value.history,
      stadiumHistory:this.clubForm.value.stadiumHistory,
      colorsHistory:this.clubForm.value.colorsHistory,
      titles:[],
      urlImageShield:'',
      urlImageStadium:''
    };
    this.clubCreated.emit({
      club:club,
      fileShield:this.selectedFile,
      fileStadium:this.selectedFile
    });
  }

  updateClub():void{
    if(this.clubForm.invalid){
      this.clubForm.markAllAsTouched();
      return;
    }

    const clubUpdated: Club = {
      idClub:1,
      name:this.clubForm.value.name,
      fundationDate:this.clubForm.value.fundationDate,
      history:this.clubForm.value.history,
      colorsHistory:this.clubForm.value.colorsHistory,
      stadiumHistory:this.clubForm.value.stadiumHistory,
      titles: this.clubForm.value.titles,
      urlImageShield:this.clubForm.value.urlImageShield,
      urlImageStadium:this.clubForm.value.urlImageStadium
    };
    this.clubUpdated.emit(clubUpdated);
  }

  closeModal():void{
    this.clubForm.reset();
    this.closedModal.emit();
  }

  onFileSelected(event:Event):void{
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length>0){
      this.selectedFile = input.files[0];
      console.log('Archivo seleccionado: ',this.selectedFile);
    }
  }

}
