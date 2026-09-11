import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Report } from '../../../../models/report';

@Component({
  selector: 'app-report-form',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './report-form.component.html',
  styleUrl: './report-form.component.css'
})
export class ReportFormComponent implements OnInit{

  reportForm!:FormGroup;
  selectedFile: File | null = null;

  @Output() reportCreated = new EventEmitter<{report:Report,file:File | null}>();
  @Output() reportUpdated = new EventEmitter<Report>();
  @Output() closedModal = new EventEmitter<void>();

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      publicationDate:['',Validators.required]
    })
  }

  createReport(){
    if(this.reportForm.invalid){
      this.reportForm.markAllAsTouched();
      return;
    }

    const report: Report = {
      idReport:0,
      title:this.reportForm.value.title,
      description:this.reportForm.value.description,
      publicationDate:this.reportForm.value.publicationDate,
      urlImage:''
    };
    this.reportCreated.emit({
      report: report,
      file: this.selectedFile
    });
  }

  updateReport(){
    if(this.reportForm.invalid){
      this.reportForm.markAllAsTouched();
      return;
    }
    const reportUpdate: Report = {
      idReport:0,
      title:this.reportForm.value.title,
      description:this.reportForm.value.description,
      publicationDate:this.reportForm.value.publicationDate,
      urlImage:this.reportForm.value.urlImage
    };
    this.reportUpdated.emit(reportUpdate);
  }

  closeModal():void{
    this.reportForm.reset();
    this.closedModal.emit();
  }

  onFileSelected(event:Event):void{
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      this.selectedFile = input.files[0];
      console.log('Archivo Seleccionado: ',this.selectedFile);
    }
  }

}
