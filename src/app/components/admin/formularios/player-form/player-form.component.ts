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
    if(this.playerForm.invalid){
      this.playerForm.markAllAsTouched();
      return;
    }

    const player: Player = {
      idPlayer: 0,
      name:this.playerForm.value.name,
      surname:this.playerForm.value.surname,
      position:this.playerForm.value.position,
      num:this.playerForm.value.num,
      urlImage:this.playerForm.value.urlImage
    };
    this.playerCreated.emit(player);
  }

  updatePlayer():void{
    if(this.playerForm.invalid){
      this.playerForm.markAllAsTouched();
      return;
    }

    const playerUpdated: Player = {
      idPlayer:0,
      name:this.playerForm.value.name,
      surname:this.playerForm.value.surname,
      position:this.playerForm.value.position,
      num:this.playerForm.value.num,
      urlImage:this.playerForm.value.urlImage
    };
    this.playerUpdated.emit(playerUpdated);
  }


    closeModal():void{
    this.playerForm.reset();
    this.closedModal.emit();
  }

}
