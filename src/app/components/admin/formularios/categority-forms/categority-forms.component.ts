import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categority } from '../../../../models/categority';
import { Player } from '../../../../models/player';
import { PlayerFormComponent } from "../player-form/player-form.component";

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

  @Output() categorityCreated = new EventEmitter<Categority>();
  @Output() closedModal = new EventEmitter<void>();

  constructor(private fb: FormBuilder){}

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
      playerList: this.players
    };
    this.categorityCreated.emit(categority);
  }

  createPlayer(player:Player):void{
    this.players.push(player);
    this.showPlayerModal = false;
  }

  openPlayerModal():void{
    this.showPlayerModal = true;
  }

  closePlayerModal():void{
    this.showPlayerModal = false;
  }

  closeModal():void{
    this.categorityForm.reset();
    this.players = [];
    this.closedModal.emit();
  }

}
