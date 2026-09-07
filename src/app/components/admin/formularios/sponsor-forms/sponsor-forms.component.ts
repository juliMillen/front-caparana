import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Sponsor } from '../../../../models/sponsor';

@Component({
  selector: 'app-sponsor-forms',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './sponsor-forms.component.html',
  styleUrl: './sponsor-forms.component.css'
})
export class SponsorFormsComponent implements OnInit{

  sponsorForm!: FormGroup;
  selectedFile: File | null = null;

  @Output() sponsorCreate = new EventEmitter<{sponsor:Sponsor, file:File | null}>();
  @Output() closedModal = new EventEmitter<void>();

  constructor(private fb: FormBuilder){

  }

  ngOnInit(): void {
    this.sponsorForm = this.fb.group({
      name: ['',Validators.required]
    })
  }

  createSponsor():void{
    if(this.sponsorForm.invalid){
      this.sponsorForm.markAllAsTouched();
      return;
    }

    const sponsor: Sponsor = {
      idSponsor: 0,
      name: this.sponsorForm.value.name,
      urlImage: ''
    };
    this.sponsorCreate.emit({
      sponsor: sponsor,
      file: this.selectedFile
    });
  }

  closeModal():void{
    this.sponsorForm.reset();
    this.closedModal.emit();
  }


  onFileSelected(event:Event): void {
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      this.selectedFile = input.files[0];
      console.log('Archivo seleccionado: ',this.selectedFile);
    }
  }
}
