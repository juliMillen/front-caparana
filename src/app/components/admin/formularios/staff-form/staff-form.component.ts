import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Staff } from '../../../../models/staff';

@Component({
  selector: 'app-staff-form',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './staff-form.component.html',
  styleUrl: './staff-form.component.css'
})
export class StaffFormComponent implements OnInit {
  @Input() staff:Staff | null = null;
  staffForm!:FormGroup;
  selectedFile:File | null = null;

  @Output() staffCreated = new EventEmitter<{staff:Staff,file:File | null}>();
  @Output() staffUpdated = new EventEmitter<{staff:Staff,file:File | null}>();
  @Output() closedModal = new EventEmitter<void>();

  constructor(private fb:FormBuilder){}

  get isEditMode():boolean{
    return this.staff != null;
  }

  ngOnInit(): void {
    this.staffForm = this.fb.group({
      name:[this.staff?.name ?? '',Validators.required],
      surname: [this.staff?.surname ?? '', Validators.required],
      position: [this.staff?.position ?? '', Validators.required]
    })
  }

  onSubmit():void{
    this.isEditMode ? this.updateStaff() : this.createStaff();
  }

  createStaff():void{
    if(this.staffForm.invalid){
      this.staffForm.markAllAsTouched();
      return;
    }

    const staff:Staff = {
      idStaff: 0,
      name:this.staffForm.value.name,
      surname:this.staffForm.value.surname,
      position:this.staffForm.value.postion,
      urlImage:''
    };
    this.staffCreated.emit({
      staff:staff,
      file:this.selectedFile
    });
  }

  updateStaff():void{
    if(this.staffForm.invalid){
      this.staffForm.markAllAsTouched();
      return;
    }

    const staff:Staff = {
      idStaff: this.staff!.idStaff,
      name:this.staffForm.value.name,
      surname:this.staffForm.value.surname,
      position:this.staffForm.value.position,
      urlImage:this.staff!.urlImage
    };
    this.staffUpdated.emit({
      staff, 
      file:this.selectedFile
    });
  }

  closeModal():void{
    this.staffForm.reset();
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
