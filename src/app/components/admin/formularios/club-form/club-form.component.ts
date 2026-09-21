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
  @Input() club:Club | null = null;

  clubForm!:FormGroup;
  selectedShield:File | null = null;
  selectedStadium:File | null = null;
  filesMissing = false;
  titles?: String[] = [];
  selectedFile:File | null = null;


  @Output() clubCreated = new EventEmitter<{club:Club,fileStadium:File | null ,fileShield:File | null }>();
  @Output() clubUpdated = new EventEmitter<{club:Club, fileStadium:File | null, fileShield:File | null}>();
  @Output() closedModal = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clubForm = this.fb.group({
      name:[this.club?.name ?? '',Validators.required],
      fundationDate:[this.club?.fundationDate ?? '',Validators.required],
      history:[this.club?.history ?? '',Validators.required],
      colorsHistory:[this.club?.colorsHistory ?? '',Validators.required],
      stadiumHistory:[this.club?.stadiumHistory ?? '',Validators.required]
    });
  }

  onSubmit():void{
    if(this.club){
      this.updateClub();
    }else{
      this.createClub();
    }
  }

  createClub():void{
    if(this.clubForm.invalid){
      this.clubForm.markAllAsTouched();
      return;
    }

    if(!this.selectedShield || !this.selectedStadium){
      this.filesMissing = true;
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
    this.clubUpdated.emit({
      club:clubUpdated,
      fileShield:this.selectedShield,
      fileStadium:this.selectedStadium
    });
  }

  closeModal():void{
    this.clubForm.reset();
    this.closedModal.emit();
  }

  onFileSelected(event:Event, type:'stadium' | 'shield'):void{
    const input = event.target as HTMLInputElement;
    const file= input.files && input.files.length > 0 ? input.files[0] : null;

    if(type === 'shield'){
      this.selectedShield = file;
    }else{
      this.selectedStadium = file;
    }
    this.filesMissing = false;
  }

}
