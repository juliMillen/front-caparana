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

  selectedExecutive: Executive | null = null;

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
    this.selectedExecutive = null;
    this.showModal = true;
  }

  openEditModal(executive:Executive):void {
    this.selectedExecutive = executive;
    this.showModal = true;
  }

  closeModal():void{
    this.showModal = false;
  }

  createExecutive(data: {executive:Executive, file:File | null}):void{

    this.executivesService.createExecutive(this.buildFormData(data)).subscribe({
      next:(data) =>{
        this.executives.push(data);
        this.showModal = false;
      },
      error: (err) =>{
        console.error('Error al crear el ejecutivo', err);
      }
    })
  
  }

  updateExecutive(data:{executive:Executive,file:File | null}):void{
    this.executivesService.updateExecutive(data.executive.idExecutive,this.buildFormData(data)).subscribe({
      next:(updated) => {
        this.executives = this.executives.map(
          e => e.idExecutive === updated.idExecutive ? updated : e
        );
        this.showModal = false;
        this.selectedExecutive = null;
      },
      error:(err) => {
        console.error('Error al actualizar ejecutivo', err);
      }
    })
  }

  private buildFormData(data:{executive:Executive, file:File | null}){
    const formData = new FormData();
    formData.append('name', data.executive.name);
    formData.append('surname',data.executive.surname);
    formData.append('position',data.executive.position);
    if(data.file){
      formData.append('image',data.file);
    }
    return formData;
  }

  deleteExecutive(idExecutive:number):void{
    this.executivesService.deleteExecutive(idExecutive).subscribe({
      next:() =>{
        this.executives = this.executives.filter(e => e.idExecutive !== idExecutive)
      },
      error: (err) => {
        console.error('Error al eliminar ejecutivo',err);
      }
    })
  }

  
}
