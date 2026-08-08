import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Executive } from '../../models/executive';
import { ExecutiveService } from '../../services/executive.service';

@Component({
  selector: 'app-executives',
  imports: [CommonModule],
  templateUrl: './executives.component.html',
  styleUrl: './executives.component.css'
})
export class ExecutivesComponent implements OnInit {
 executives: Executive[] = [];

 constructor(private executiveService: ExecutiveService){

 }

 ngOnInit(): void {
   this.getExecutives();
 }

 getExecutives():void{
  this.executiveService.getExecutives().subscribe({
    next:(data) => {
      this.executives = data;
    },
    error: (err) =>{
      console.error('Error al obtener ejecutivos',err);
    }
  })
 }


}
