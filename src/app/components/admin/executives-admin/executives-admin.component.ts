import { Component, OnInit } from '@angular/core';
import { ExecutiveService } from '../../../services/executive.service';
import { Executive } from '../../../models/executive';
import { CommonModule } from '@angular/common';
import { FormsExecutivesComponent } from "../formularios/forms-executives/forms-executives.component";

@Component({
  selector: 'app-executives-admin',
  imports: [CommonModule, FormsExecutivesComponent],
  templateUrl: './executives-admin.component.html',
  styleUrl: './executives-admin.component.css'
})
export class ExecutivesAdminComponent implements OnInit{

  executives: Executive[] = [];

  showModal: boolean = false;

  constructor(private executivesService:ExecutiveService){}

  ngOnInit(): void {
    this.getExecutives();
  }

  getExecutives():void{
    this.executivesService.getExecutives().subscribe({
      next: (data) =>{
        this.executives = data;
      },
      error: (err)=>{
        console.error("Error al obtener ejecutivos ",err);
      }
    })
  }

  openModal():void {
    this.showModal = true;
  }

  openEditModal():void {
    this.showModal = true;
  }

  closeModal():void{
    this.showModal = false;
  }

  createExecutive(executive:Executive):void{
    this.executivesService.createExecutive(executive).subscribe({
      next:(data) =>{
        this.executives.push(data);
        this.showModal = false;
      },
      error: (err) =>{
        console.error("Error al crear el ejecutivo", err);
      }
    })
  
  }

  updateExecutive(executive:Executive):void{
    this.executivesService.updateExecutive(executive.idExecutive,executive).subscribe({
      next:(data) => {
        this.executives.push(data);
        this.showModal = false;
      },
      error:(err) => {
        console.error("Error al actualizar ejecutivo", err);
      }
    })
  }

  eliminatedExecutive(idExecutive:number):void{
    this.executivesService.deleteExecutive(idExecutive).subscribe({
      next:() =>{
        this.executives = this.executives.filter(e => e.idExecutive !== idExecutive)
      },
      error: (err) => {
        console.error("Error al eliminar ejecutivo");
      }
    })
  }

  
}
