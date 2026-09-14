import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Photo } from '../../../../models/photo';

@Component({
  selector: 'app-photo-form',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './photo-form.component.html',
  styleUrl: './photo-form.component.css'
})
export class PhotoFormComponent implements OnInit{

  photoForm!:FormGroup;
  selectedFile:File | null = null;

  @Output() photoCreated = new EventEmitter<{photo:Photo,file:File |null}>();
  @Output() closedModal = new EventEmitter<void>();

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.photoForm = this.fb.group({
      description:['',Validators.required]
    });
  }

  createPhoto(){
    if(this.photoForm.invalid){
      this.photoForm.markAllAsTouched();
      return;
    }

    const photo:Photo = {
      idPhoto: 0,
      description: this.photoForm.value.description,
      urlImage:''
    };
    this.photoCreated.emit({
      photo:photo,
      file:this.selectedFile
    });
  }

  closeModal(){
    this.photoForm.reset();
    this.closedModal.emit();
  }

  onFileSelected(event:Event):void{
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      this.selectedFile = input.files[0];
      console.log('Archivo seleccionado',this.selectedFile);
    }
  }

}
