import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categority } from '../../../../models/categority';
import { Player } from '../../../../models/player';
import { PlayerFormComponent } from "../player-form/player-form.component";
import { CategorityService } from '../../../../services/categority.service';
import { PlayerService } from '../../../../services/player.service';

@Component({
  selector: 'app-categority-forms',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, PlayerFormComponent],
  templateUrl: './categority-forms.component.html',
  styleUrl: './categority-forms.component.css'
})
export class CategorityFormsComponent implements OnInit{

  categorityForm!: FormGroup;
  players: Player[] = [];
  showPlayerModal: boolean = false;
  createdCategority: Categority | null = null;

  @Output() categorityCreated = new EventEmitter<Categority>();
  @Output() closedModal = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private categorityService:CategorityService, private playerService:PlayerService){}

  ngOnInit(): void {
    this.categorityForm = this.fb.group({
      nameCategority:['',Validators.required]
    });
  }

  createCategority():void{
    if(this.categorityForm.invalid){
      this.categorityForm.markAllAsTouched();
      return;
    }

    const categority:Categority = {
      idCategority: 0,
      nameCategority:this.categorityForm.value.nameCategority,
      playerList:[]
    };
    this.categorityService.createCategority(categority).subscribe({
      next:(data) =>{
        this.createdCategority = data;
        console.log('Categoria creada: ',data);
      },
      error:(err) => {
        console.error('Error al crear categoria',err);
      }
    });
  }

  createPlayer(data:{player:Player, file:File | null}):void{

    if(!this.createdCategority) return;

    const formData = new FormData;
    formData.append('name',data.player.name);
    formData.append('surname',data.player.surname);
    formData.append('position',data.player.position);
    formData.append('num',data.player.num.toString());

    if(data.file){
      formData.append('image',data.file);
    }
    this.playerService.createPlayer(this.createdCategority.idCategority,formData).subscribe({
      next:(data) => {
        this.players.push(data);
        console.log('Jugador agregado: ',data);
        this.showPlayerModal = false;
      },
      error:(err) =>{
        console.error('Error al crear jugador',err);
      }
    });
  }

  openPlayerModal():void{
    this.showPlayerModal = true;
  }

  closePlayerModal():void{
    this.showPlayerModal = false;
  }

  finish():void{
    if(this.createdCategority){
      this.createdCategority.playerList = this.players;
      this.categorityCreated.emit(this.createdCategority);
    }
    this.closeModal();
  }

  closeModal():void{
    this.categorityForm.reset();
    this.players = [];
    this.createdCategority = null;
    this.closedModal.emit();
  }

}
