import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Player } from '../../../../models/player';

@Component({
  selector: 'app-player-form',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './player-form.component.html',
  styleUrl: './player-form.component.css'
})
export class PlayerFormComponent implements OnInit{

  @Input() player: Player | null = null;

  playerForm!:FormGroup;
  selectedFile: File | null = null;

  @Output() playerCreated= new EventEmitter<{player:Player,file:File | null}>();
  @Output() playerUpdated = new EventEmitter<{player:Player, file:File | null}>();
  @Output() closedModal = new EventEmitter<void>();

  constructor(private fb:FormBuilder){}

  get isEditMode():boolean{
    return this.player != null;
  }

  ngOnInit(): void {
    this.playerForm = this.fb.group({
      name:['',Validators.required],
      surname:['',Validators.required],
      position:['',Validators.required],
      num:['',Validators.required]
    });

    if(this.player){
      this.playerForm.patchValue({
        name: this.player.name,
        surname: this.player.surname,
        position: this.player.position,
        num: this.player.num
      });
    }
  }

  onSubmit():void{
    this.isEditMode ? this.updatePlayer() : this.createPlayer();
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
      urlImage:''
    };
    this.playerCreated.emit({
      player: player,
      file:this.selectedFile
    });
  }

  updatePlayer():void{
    if(this.playerForm.invalid){
      this.playerForm.markAllAsTouched();
      return;
    }

    const player: Player = {
      idPlayer:this.player!.idPlayer,
      name:this.playerForm.value.name,
      surname:this.playerForm.value.surname,
      position:this.playerForm.value.position,
      num:this.playerForm.value.num,
      urlImage:this.player!.urlImage
    };
    this.playerUpdated.emit({
      player, file:this.selectedFile
    });
  }


    closeModal():void{
    this.playerForm.reset();
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
