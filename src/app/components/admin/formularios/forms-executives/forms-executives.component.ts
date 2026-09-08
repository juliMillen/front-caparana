import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Executive } from '../../../../models/executive';

@Component({
  selector: 'app-forms-executives',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './forms-executives.component.html',
  styleUrl: './forms-executives.component.css'
})
export class FormsExecutivesComponent implements OnInit{
  executiveForm!: FormGroup;
  selectedFile: File | null = null;

  @Output() executiveCreated = new EventEmitter<{executive:Executive,file:File | null }>();
  @Output() executiveUpdated = new EventEmitter<Executive>();
  @Output() closedModal = new EventEmitter<void>()


  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.executiveForm = this.fb.group({
      nameExecutive: ['', Validators.required],
      surnameExecutive:['',Validators.required],
      positionExecutive:['',Validators.required]
    });
  }

  createExecutive():void{
    if(this.executiveForm.invalid){
      this.executiveForm.markAllAsTouched();
      return;
    }

    const executive: Executive = {
      idExecutive: 0,
      name:this.executiveForm.value.nameExecutive,
      surname:this.executiveForm.value.surnameExecutive,
      position: this.executiveForm.value.positionExecutive,
      urlImage: ''
    };
    this.executiveCreated.emit({
      executive:executive,
      file:this.selectedFile
    });
  }

  updateExecutive():void{
      if(this.executiveForm.invalid){
      this.executiveForm.markAllAsTouched();
      return;
    }

    const executive: Executive = {
      idExecutive: 0,
      name:this.executiveForm.value.nameExecutive,
      surname:this.executiveForm.value.surnameExecutive,
      position: this.executiveForm.value.positionExecutive,
      urlImage: this.executiveForm.value.urlImage
      };
      this.executiveUpdated.emit(executive);
    }

  closeModal():void{
    this.executiveForm.reset();
    this.closedModal.emit();
  }

  onFileSelected(event:Event):void{
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      this.selectedFile = input.files[0];
      console.log('Archivo seleccionado: ',this.selectedFile);
    }
  }
}
