import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Player } from '../../../../models/player';

@Component({
  selector: 'app-player-form',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.css'
})
export class PlayerFormComponent implements OnInit{

  playerForm!:FormGroup;

  @Output() playerCreated= new EventEmitter<Player>();
  @Output() playerUpdated = new EventEmitter<Player>();
  @Output() closedModal = new EventEmitter<void>();

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.playerForm = this.fb.group({
      name:['',Validators.required],
      surname:['',Validators.required],
      position:['',Validators.required],
      num:['',Validators.required]
    })
  }

  createPlayer(){
    
  }


    closeModal():void{
    this.playerForm.reset();
    this.closedModal.emit();
  }

}
