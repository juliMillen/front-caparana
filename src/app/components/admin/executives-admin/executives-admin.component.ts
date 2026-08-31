import { Component, OnInit } from '@angular/core';
import { ExecutiveService } from '../../../services/executive.service';
import { Executive } from '../../../models/executive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-executives-admin',
  imports: [CommonModule],
  templateUrl: './executives-admin.component.html',
  styleUrl: './executives-admin.component.css'
})
export class ExecutivesAdminComponent implements OnInit{

  executives: Executive[] = [];

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
}
