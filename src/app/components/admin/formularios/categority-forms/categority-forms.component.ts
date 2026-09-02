import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categority } from '../../../../models/categority';

@Component({
  selector: 'app-categority-forms',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './categority-forms.component.html',
  styleUrl: './categority-forms.component.css'
})
export class CategorityFormsComponent implements OnInit{

  categorityForm!: FormGroup;

  @Output() categorityCreated = new EventEmitter<Categority>();
  @Output() closedModal = new EventEmitter<void>();

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.categorityForm = this.fb.group({
      nameCategority:['',Validators.required]
    });
  }

  createCategority():void{
    
  }

  closeModal():void{

  }

}
